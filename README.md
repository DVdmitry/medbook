# MedBook - Medical Appointment Booking Platform

A professional medical appointment booking platform built with Vue 3, TypeScript, and modern web technologies. This application demonstrates complex form handling, state management, and responsive design.

## Features

- **Doctor Directory**: Browse and filter healthcare professionals by specialty
- **Multi-Step Booking Forms**: Comprehensive patient intake process
- **Specialty-Specific Forms**: Tailored medical questionnaires for different specialties:
  - Cardiology (cardiovascular health assessment)
  - Dermatology (skin condition evaluation)
  - Orthopedic Surgery (musculoskeletal injury assessment)
  - General Practice (general health screening)
- **Medical History Tracking**: Detailed patient history collection
- **Appointment Scheduling**: Easy date and time selection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Vue Router** for navigation
- **Pinia** for state management
- **Tailwind CSS** for styling
- **VeeValidate + Yup** for form validation

## Project Structure

```
src/
├── components/
│   └── forms/              # Reusable form components
│       └── specialty/      # Specialty-specific forms
├── views/                  # Page components
├── stores/                 # Pinia stores
├── types/                  # TypeScript type definitions
├── data/                   # Mock data
└── router/                 # Vue Router configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for easy deployment on Netlify:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Deploy!

## Form Flow

1. **Personal Information**: Basic patient details and emergency contact
2. **Medical History**: Allergies, conditions, medications, and family history
3. **Specialty Assessment**: Condition-specific questions based on doctor's specialty
4. **Appointment Selection**: Choose date, time, and add notes
5. **Confirmation**: Review and confirm booking details

## Demo Data

The application includes 7 mock doctors across different specialties with realistic profiles, ratings, and available time slots.

## License

This is a portfolio/demonstration project.

---

Built with Vue 3 + TypeScript + Vite
