import type { Doctor } from '@/types/medical.types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'cardiologist',
    specialtyLabel: 'Cardiologist',
    rating: 4.9,
    reviewCount: 234,
    experience: 15,
    education: 'Harvard Medical School, MD',
    languages: ['English', 'Spanish'],
    avatar: 'https://i.pravatar.cc/150?img=1',
    consultationFee: 250,
    availableSlots: ['2025-11-01T09:00', '2025-11-01T14:00', '2025-11-02T10:00', '2025-11-03T11:00']
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'dermatologist',
    specialtyLabel: 'Dermatologist',
    rating: 4.8,
    reviewCount: 189,
    experience: 12,
    education: 'Johns Hopkins University, MD',
    languages: ['English'],
    avatar: 'https://i.pravatar.cc/150?img=12',
    consultationFee: 200,
    availableSlots: ['2025-11-01T10:00', '2025-11-01T15:00', '2025-11-02T09:00', '2025-11-04T14:00']
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialty: 'general-practitioner',
    specialtyLabel: 'General Practitioner',
    rating: 4.7,
    reviewCount: 421,
    experience: 10,
    education: 'Stanford Medical School, MD',
    languages: ['English', 'Mandarin'],
    avatar: 'https://i.pravatar.cc/150?img=5',
    consultationFee: 150,
    availableSlots: ['2025-11-01T08:00', '2025-11-01T13:00', '2025-11-02T11:00', '2025-11-03T09:00']
  },
  {
    id: '4',
    name: 'Dr. Michael Rodriguez',
    specialty: 'orthopedic-surgeon',
    specialtyLabel: 'Orthopedic Surgeon',
    rating: 4.9,
    reviewCount: 156,
    experience: 18,
    education: 'Mayo Clinic, MD',
    languages: ['English', 'Spanish', 'Portuguese'],
    avatar: 'https://i.pravatar.cc/150?img=13',
    consultationFee: 300,
    availableSlots: ['2025-11-01T11:00', '2025-11-02T14:00', '2025-11-03T10:00', '2025-11-05T09:00']
  },
  {
    id: '5',
    name: 'Dr. Olivia Thompson',
    specialty: 'neurologist',
    specialtyLabel: 'Neurologist',
    rating: 4.8,
    reviewCount: 198,
    experience: 14,
    education: 'Yale School of Medicine, MD',
    languages: ['English', 'French'],
    avatar: 'https://i.pravatar.cc/150?img=9',
    consultationFee: 280,
    availableSlots: ['2025-11-01T09:30', '2025-11-02T13:00', '2025-11-03T15:00', '2025-11-04T10:00']
  },
  {
    id: '6',
    name: 'Dr. Robert Patel',
    specialty: 'gastroenterologist',
    specialtyLabel: 'Gastroenterologist',
    rating: 4.7,
    reviewCount: 167,
    experience: 13,
    education: 'UCLA Medical Center, MD',
    languages: ['English', 'Hindi'],
    avatar: 'https://i.pravatar.cc/150?img=14',
    consultationFee: 260,
    availableSlots: ['2025-11-01T10:30', '2025-11-02T15:00', '2025-11-03T09:30', '2025-11-04T13:00']
  },
  {
    id: '7',
    name: 'Dr. Jennifer Martinez',
    specialty: 'pediatrician',
    specialtyLabel: 'Pediatrician',
    rating: 4.9,
    reviewCount: 312,
    experience: 11,
    education: 'Boston Children\'s Hospital, MD',
    languages: ['English', 'Spanish'],
    avatar: 'https://i.pravatar.cc/150?img=10',
    consultationFee: 180,
    availableSlots: ['2025-11-01T08:30', '2025-11-01T14:30', '2025-11-02T10:30', '2025-11-03T13:30']
  }
];

export const specialtyDescriptions: Record<string, string> = {
  cardiologist: 'Specializes in heart and cardiovascular system disorders',
  dermatologist: 'Treats skin, hair, and nail conditions',
  'general-practitioner': 'Provides primary healthcare for common illnesses',
  'orthopedic-surgeon': 'Specializes in musculoskeletal system injuries and conditions',
  neurologist: 'Treats disorders of the nervous system',
  gastroenterologist: 'Specializes in digestive system and related disorders',
  pediatrician: 'Provides medical care for infants, children, and adolescents'
};
