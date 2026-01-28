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

  // Extract doctor ID from path: /api/doctors/:id/booking-fields
  const pathMatch = event.path.match(/doctors\/(\d+)\/booking-fields/);
  if (!pathMatch) {
    return errorResponse('Invalid path', 'INVALID_PATH', 400);
  }

  const doctorId = pathMatch[1];

  // Get doctor's specialty
  const { data: doctor, error: doctorError } = await supabase
    .from('doctors')
    .select('specialty')
    .eq('id', doctorId)
    .single();

  if (doctorError || !doctor) {
    return errorResponse('Doctor not found', 'NOT_FOUND', 404);
  }

  // Get specialty fields
  const { data: fields, error: fieldsError } = await supabase
    .from('specialty_fields')
    .select('*')
    .eq('specialty', doctor.specialty)
    .order('display_order');

  if (fieldsError) {
    return errorResponse('Failed to fetch fields', 'DATABASE_ERROR', 500);
  }

  // Group fields by category
  const requiredFields = fields
    .filter((f) => f.field_category === 'required')
    .map(formatField);

  const optionalFields = fields
    .filter((f) => f.field_category === 'optional')
    .map(formatField);

  const commonFields = fields
    .filter((f) => f.field_category === 'common')
    .map(formatField);

  return jsonResponse({
    doctorId,
    specialty: doctor.specialty,
    requiredFields,
    optionalFields,
    commonFields,
  });
};

function formatField(f: {
  field_id: string;
  field_type: string;
  label: string;
  is_required: boolean;
  ai_hint: string;
}) {
  return {
    id: f.field_id,
    type: f.field_type,
    label: f.label,
    required: f.is_required,
    aiHint: f.ai_hint,
  };
}
