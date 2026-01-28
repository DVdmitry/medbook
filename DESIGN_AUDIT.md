# MedBook Design Audit & Redesign Plan

**Дата:** 2026-01-28
**Версия:** 1.0

---

## 1. Текущий Стек Технологий

- **Framework:** Vue 3.5 + Composition API
- **Styling:** Tailwind CSS 3.4
- **Icons:** Heroicons
- **State:** Pinia
- **Router:** Vue Router 4

---

## 2. Аудит Страниц

### 2.1 HomeView (Главная страница)

| Аспект | Текущее состояние | Проблема | Приоритет |
|--------|------------------|----------|-----------|
| Hero секция | Плоский белый фон, базовый текст | Отсутствие визуального интереса, нет wow-эффекта | HIGH |
| Feature карточки | Простые карточки с иконками | Нет hover-анимаций, нет глубины | MEDIUM |
| Specialty кнопки | Плоские серые pill-кнопки | Нет визуальной иерархии, скучный дизайн | MEDIUM |
| How It Works | Простые круги с номерами | Нет связующей линии анимации, статично | LOW |
| Типографика | Стандартные размеры | Нет fluid typography, нет иерархии веса | MEDIUM |
| Анимации | Отсутствуют на странице | Страница статична, нет входных анимаций | HIGH |

**Рекомендации 2026:**
- Gradient mesh backgrounds
- Micro-interactions на каждом элементе
- Bento grid layout для features
- Animated illustrations / Lottie

### 2.2 DoctorListView (Список врачей)

| Аспект | Текущее состояние | Проблема | Приоритет |
|--------|------------------|----------|-----------|
| Search bar | Простой input с иконкой | Нет анимации focus, нет suggestions | MEDIUM |
| Filter pills | Статичные кнопки | Нет анимации переключения, нет счетчика | MEDIUM |
| Doctor cards | Базовые карточки | Нет skeleton loading, hover примитивный | HIGH |
| Avatar | Простое изображение | Нет online статуса, нет ring | LOW |
| Empty state | Базовый текст | Нет иллюстрации, скучно | LOW |
| Grid layout | Стандартный grid | Нет masonry, нет stagger animation | MEDIUM |

**Рекомендации 2026:**
- Card с glassmorphism эффектом
- Skeleton loaders при загрузке
- Staggered входные анимации
- Floating action для мобильных

### 2.3 BookingFormView (Форма бронирования)

| Аспект | Текущее состояние | Проблема | Приоритет |
|--------|------------------|----------|-----------|
| Progress bar | Линейный прогресс | Нет пульсации активного шага, базовый | MEDIUM |
| Step indicators | Круги с номерами | Нет анимации перехода между шагами | MEDIUM |
| Form fields | Стандартные inputs | Нет floating labels, нет inline validation | HIGH |
| Buttons | Простые кнопки | Нет loading states, нет ripple | MEDIUM |
| Doctor card | Статичная карточка | Можно сделать collapsible на mobile | LOW |
| Transitions | Нет transition между шагами | Резкое переключение контента | HIGH |

**Рекомендации 2026:**
- Floating labels с анимацией
- Inline validation с иконками
- Slide transitions между шагами
- Progress bar с gradient pulse

### 2.4 ConfirmationView (Подтверждение)

| Аспект | Текущее состояние | Проблема | Приоритет |
|--------|------------------|----------|-----------|
| Success icon | Статичный круг | Нет анимации появления (checkmark) | HIGH |
| Info cards | Grid карточек | Можно добавить slide-in эффект | MEDIUM |
| Next steps | Пронумерованный список | Нет визуального timeline | LOW |
| Confetti | Отсутствует | Нет celebration эффекта | MEDIUM |

**Рекомендации 2026:**
- Animated checkmark (SVG stroke animation)
- Confetti celebration effect
- Card entrance animations
- Share / Calendar integration buttons

### 2.5 App.vue (Layout)

| Аспект | Текущее состояние | Проблема | Приоритет |
|--------|------------------|----------|-----------|
| Header | Простой sticky header | Нет backdrop blur при скролле | MEDIUM |
| Navigation | Текстовые ссылки | Нет mobile menu (burger), нет active indicator | HIGH |
| Theme toggle | Фиксированная кнопка | Позиция может мешать на mobile | LOW |
| Footer | Минималистичный | Нет social links, нет newsletter | LOW |

**Рекомендации 2026:**
- Header с progressive blur on scroll
- Mobile drawer navigation
- Breadcrumbs на inner pages
- Rich footer с columns

---

## 3. Аудит Компонентов Форм

### 3.1 PatientInfoForm

| Проблема | Описание | Приоритет |
|----------|----------|-----------|
| Labels | Статичные над полем | MEDIUM |
| Validation | Нет inline validation | HIGH |
| Error states | Нет визуализации ошибок | HIGH |
| Input focus | Базовый ring | LOW |

### 3.2 MedicalHistoryForm

| Проблема | Описание | Приоритет |
|----------|----------|-----------|
| Textarea | Нет auto-resize | MEDIUM |
| Select styling | Стандартный select | MEDIUM |
| Section dividers | Простой border-t | LOW |

### 3.3 Specialty Forms

| Проблема | Описание | Приоритет |
|----------|----------|-----------|
| Checkbox cards | Базовые с серым фоном | MEDIUM |
| Conditional fields | Нет slide animation | MEDIUM |
| Toggle buttons | DermatologyForm - нет dark mode стилей | HIGH |

---

## 4. Глобальные CSS Проблемы

### 4.1 style.css

| Проблема | Описание | Приоритет |
|----------|----------|-----------|
| Glassmorphism классы | Определены но не используются | LOW |
| Анимации | Определены но редко применяются | MEDIUM |
| Hero gradient | Не используется на странице | LOW |
| Transitions на * | Может вызывать performance issues | MEDIUM |

### 4.2 tailwind.config.js

| Проблема | Описание | Приоритет |
|----------|----------|-----------|
| Custom colors | primary/accent определены но используется sky- | MEDIUM |
| Animations | Определены но не применяются к компонентам | MEDIUM |

---

## 5. Accessibility (a11y) Issues

| Проблема | Местоположение | Приоритет |
|----------|---------------|-----------|
| Нет skip to content link | App.vue | MEDIUM |
| Focus visible слабый | Глобально | HIGH |
| Нет aria-labels на кнопках с иконками | Theme toggle | HIGH |
| Form field errors не связаны с input | Формы | HIGH |
| Color contrast в dark mode | Некоторые gray-400 тексты | MEDIUM |

---

## 6. Mobile/Responsive Issues

| Проблема | Местоположение | Приоритет |
|----------|---------------|-----------|
| Нет mobile navigation | Header | HIGH |
| Specialty pills overflow | HomeView, DoctorListView | MEDIUM |
| Step labels hidden на md | BookingFormView | LOW |
| Touch targets < 44px | Некоторые checkbox | MEDIUM |
| Нет safe-area padding | Layout | LOW |

---

## 7. Performance Issues

| Проблема | Описание | Приоритет |
|----------|----------|-----------|
| Нет lazy loading images | Doctor avatars | MEDIUM |
| Transition на all elements | style.css line 6-8 | MEDIUM |
| Нет code splitting для форм | BookingFormView | LOW |

---

## 8. Best Practices Violations

### SOLID/DRY/KISS

| Нарушение | Местоположение | Рекомендация |
|-----------|---------------|--------------|
| Повторяющиеся button стили | Все views | Вынести в компонент |
| Дублирование doctor card layout | DoctorListView, BookingFormView | Создать DoctorCard компонент |
| Повторяющаяся логика fillWithDefaults | Все формы | Создать composable |
| Inline emit handlers | Формы | Вынести в named functions |

### File/Function Size

| Файл | Строк | Рекомендация |
|------|-------|--------------|
| BookingFormView.vue | 250+ | Вынести confirmation step в компонент |
| DoctorListView.vue | 200 | OK |
| HomeView.vue | 174 | OK |

---

## 9. План Редизайна (Задачи)

### Фаза 1: Глобальные стили и основа (HIGH priority)

- [ ] **Task 1.1:** Обновить tailwind.config.js - новая цветовая схема 2026
- [ ] **Task 1.2:** Переписать style.css - современные компоненты
- [ ] **Task 1.3:** Создать UI компонент библиотеку (Button, Card, Input)
- [ ] **Task 1.4:** Добавить mobile navigation в App.vue

### Фаза 2: Главная страница (HIGH priority)

- [ ] **Task 2.1:** Редизайн Hero секции - gradient mesh, анимации
- [ ] **Task 2.2:** Редизайн Feature cards - bento grid, hover effects
- [ ] **Task 2.3:** Редизайн Specialty секции - animated pills
- [ ] **Task 2.4:** Редизайн How It Works - timeline animation

### Фаза 3: Список врачей (HIGH priority)

- [ ] **Task 3.1:** Редизайн Search bar - modern input с анимациями
- [ ] **Task 3.2:** Редизайн Filter pills - счетчики, анимации
- [ ] **Task 3.3:** Редизайн Doctor cards - glassmorphism, hover
- [ ] **Task 3.4:** Добавить Skeleton loaders
- [ ] **Task 3.5:** Добавить staggered animations

### Фаза 4: Booking Form (MEDIUM priority)

- [ ] **Task 4.1:** Редизайн Progress bar - animated gradient
- [ ] **Task 4.2:** Редизайн Step indicators - connected line animation
- [ ] **Task 4.3:** Добавить slide transitions между шагами
- [ ] **Task 4.4:** Редизайн form inputs - floating labels
- [ ] **Task 4.5:** Добавить inline validation UI

### Фаза 5: Confirmation Page (MEDIUM priority)

- [ ] **Task 5.1:** Animated checkmark icon
- [ ] **Task 5.2:** Card entrance animations
- [ ] **Task 5.3:** Confetti celebration effect
- [ ] **Task 5.4:** Add to calendar button

### Фаза 6: Form Components (MEDIUM priority)

- [ ] **Task 6.1:** Создать reusable FormField component
- [ ] **Task 6.2:** Создать reusable Checkbox/Toggle component
- [ ] **Task 6.3:** Добавить animation к conditional fields
- [ ] **Task 6.4:** Исправить dark mode в DermatologyForm

### Фаза 7: Accessibility & Performance (LOW-MEDIUM priority)

- [ ] **Task 7.1:** Добавить skip to content link
- [ ] **Task 7.2:** Улучшить focus states
- [ ] **Task 7.3:** Добавить aria-labels
- [ ] **Task 7.4:** Lazy loading для изображений
- [ ] **Task 7.5:** Убрать global transition на *

### Фаза 8: Рефакторинг (LOW priority)

- [ ] **Task 8.1:** Создать DoctorCard компонент
- [ ] **Task 8.2:** Создать useFillDefaults composable
- [ ] **Task 8.3:** Вынести ConfirmationStep в отдельный компонент

---

## 10. Тренды Дизайна 2026

Редизайн будет учитывать следующие тренды:

1. **Glassmorphism 2.0** - Subtle frosted glass с gradient borders
2. **Micro-interactions** - Каждый элемент реагирует на действия
3. **Gradient Mesh** - Сложные многоцветные градиенты
4. **Bento Grid** - Асимметричные сетки для features
5. **Depth & Layering** - Многослойность с тенями
6. **Motion Design** - Плавные переходы и анимации
7. **Dark Mode First** - Приоритет темной темы
8. **Accessibility** - WCAG 2.2 compliance
9. **Variable Fonts** - Динамическая типографика
10. **3D Elements** - Subtle 3D icons и illustrations

---

## 11. Порядок Выполнения

Рекомендуемая последовательность выполнения задач:

1. **Task 1.1-1.4** (Фаза 1) - Основа для всего редизайна
2. **Task 2.1-2.4** (Фаза 2) - Главная страница - первое впечатление
3. **Task 3.1-3.5** (Фаза 3) - Основная функциональность
4. **Task 4.1-4.5** (Фаза 4) - Booking flow
5. **Task 5.1-5.4** (Фаза 5) - Финальный touchpoint
6. **Task 6.1-6.4** (Фаза 6) - Polish форм
7. **Task 7.1-7.5** (Фаза 7) - A11y и performance
8. **Task 8.1-8.3** (Фаза 8) - Code quality

---

**Готов начать с Task 1.1?**
