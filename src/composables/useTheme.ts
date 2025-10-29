import { ref, onMounted, watch } from 'vue';

export function useTheme() {
  const isDark = ref(true); // Dark mode по умолчанию

  onMounted(() => {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    }

    // Применяем тему
    applyTheme();
  });

  watch(isDark, () => {
    applyTheme();
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  });

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  return {
    isDark,
    toggleTheme
  };
}
