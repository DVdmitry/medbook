import type { Handler } from '@netlify/functions';
import { supabase, jsonResponse, errorResponse, corsHeaders } from './lib/supabase';

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return errorResponse('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
  }

  const path = event.path.replace('/.netlify/functions/doctors', '').replace('/api/doctors', '');
  const doctorId = path.replace('/', '');

  // GET /api/doctors/:id - Single doctor
  if (doctorId) {
    const { data: doctor, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', doctorId)
      .single();

    if (error || !doctor) {
      return errorResponse('Doctor not found', 'NOT_FOUND', 404);
    }

    return jsonResponse({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      specialtyLabel: doctor.specialty_label,
      rating: parseFloat(doctor.rating),
      reviewCount: doctor.review_count,
      experience: doctor.experience,
      education: doctor.education,
      languages: Array.isArray(doctor.languages)
        ? doctor.languages
        : (typeof doctor.languages === 'string' ? doctor.languages.split(',').map((l: string) => l.trim()) : []),
      consultationFee: parseFloat(doctor.consultation_fee),
      avatar: doctor.avatar,
      bio: doctor.bio,
    });
  }

  // GET /api/doctors - List all doctors
  const { specialty } = event.queryStringParameters || {};

  let query = supabase.from('doctors').select('*');

  if (specialty) {
    query = query.eq('specialty', specialty.toLowerCase());
  }

  const { data: doctors, error } = await query.order('rating', { ascending: false });

  if (error) {
    return errorResponse('Failed to fetch doctors', 'DATABASE_ERROR', 500);
  }

  const formattedDoctors = doctors.map((d) => ({
    id: d.id,
    name: d.name,
    specialty: d.specialty,
    specialtyLabel: d.specialty_label,
    rating: parseFloat(d.rating),
    reviewCount: d.review_count,
    experience: d.experience,
    education: d.education,
    languages: Array.isArray(d.languages)
      ? d.languages
      : (typeof d.languages === 'string' ? d.languages.split(',').map((l: string) => l.trim()) : []),
    consultationFee: parseFloat(d.consultation_fee),
    avatar: d.avatar,
  }));

  return jsonResponse({
    doctors: formattedDoctors,
    total: formattedDoctors.length,
  });
};
