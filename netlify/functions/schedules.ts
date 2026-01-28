import type { Handler } from '@netlify/functions';
import { supabase, jsonResponse, errorResponse, corsHeaders } from './lib/supabase';

const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return errorResponse('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
  }

  // Extract doctor ID from path: /api/doctors/:id/schedule
  const pathMatch = event.path.match(/doctors\/(\d+)\/schedule/);
  if (!pathMatch) {
    return errorResponse('Invalid path', 'INVALID_PATH', 400);
  }

  const doctorId = pathMatch[1];

  // Get schedule
  const { data: schedules, error: scheduleError } = await supabase
    .from('schedules')
    .select('*')
    .eq('doctor_id', doctorId);

  if (scheduleError) {
    return errorResponse('Failed to fetch schedule', 'DATABASE_ERROR', 500);
  }

  // Get breaks
  const { data: breaks, error: breaksError } = await supabase
    .from('schedule_breaks')
    .select('*')
    .eq('doctor_id', doctorId);

  if (breaksError) {
    return errorResponse('Failed to fetch breaks', 'DATABASE_ERROR', 500);
  }

  // Format working hours
  const workingHours: Record<string, { start: string; end: string } | null> = {};

  for (let i = 0; i < 7; i++) {
    const schedule = schedules.find((s) => s.day_of_week === i);
    const dayName = dayNames[i];

    if (schedule && schedule.is_working) {
      workingHours[dayName] = {
        start: schedule.start_time,
        end: schedule.end_time,
      };
    } else {
      workingHours[dayName] = null;
    }
  }

  // Format breaks (only for working days, typically weekdays)
  const formattedBreaks = breaks.map((b) => ({
    dayOfWeek: b.day_of_week,
    start: b.start_time,
    end: b.end_time,
    label: b.label,
  }));

  return jsonResponse({
    doctorId,
    timezone: 'America/New_York',
    workingHours,
    slotDuration: 30,
    bufferTime: 15,
    breaks: formattedBreaks,
  });
};
