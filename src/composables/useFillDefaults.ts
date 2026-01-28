import { ref, watch, type Ref } from 'vue';

/**
 * Composable for handling demo data fill functionality in forms.
 * Provides a checkbox toggle that fills form data with default values.
 *
 * @param formData - Reactive ref containing form data
 * @param defaultValues - Default values to fill when toggle is enabled
 * @returns Object containing fillWithDefaults ref
 */
export function useFillDefaults<T extends object>(
  formData: Ref<Partial<T>>,
  defaultValues: Partial<T>
) {
  const fillWithDefaults = ref(false);

  watch(fillWithDefaults, (shouldFill) => {
    if (shouldFill) {
      formData.value = { ...defaultValues };
    }
  });

  return {
    fillWithDefaults
  };
}
