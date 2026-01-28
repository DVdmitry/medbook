import type { Handler } from '@netlify/functions';
import { supabase, jsonResponse, errorResponse, corsHeaders } from './lib/supabase';

function generateSlotId(): string {
  return 'slot_' + Math.random().toString(36).substring(2, 11);
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return errorResponse('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
  }

  // Extract doctor ID from path: /api/doctors/:id/slots
  const pathMatch = event.path.match(/doctors\/(\d+)\/slots/);
  if (!pathMatch) {
    return errorResponse('Invalid path', 'INVALID_PATH', 400);
  }

  const doctorId = pathMatch[1];
  const { date } = event.queryStringParameters || {};

  if (!date) {
    return errorResponse('Date parameter is required', 'MISSING_DATE', 400);
  }

  // Parse date to get day of week
  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.getDay(); // 0 = Sunday

  // Get schedule for this day
  const { data: schedule, error: scheduleError } = await supabase
    .from('schedules')
    .select('*')
    .eq('doctor_id', doctorId)
    .eq('day_of_week', dayOfWeek)
    .single();

  if (scheduleError || !schedule || !schedule.is_working) {
    return jsonResponse({
      doctorId,
      date,
      slots: [],
      availableCount: 0,
      totalCount: 0,
      message: 'Doctor is not available on this day',
    });
  }

  // Get breaks for this day
  const { data: breaks } = await supabase
    .from('schedule_breaks')
    .select('*')
    .eq('doctor_id', doctorId)
    .eq('day_of_week', dayOfWeek);

  // Get existing booked slots for this date
  const { data: existingSlots } = await supabase
    .from('slots')
    .select('start_time, status')
    .eq('doctor_id', doctorId)
    .eq('date', date);

  const bookedTimes = new Set(
    existingSlots?.filter((s) => s.status === 'booked').map((s) => s.start_time) || []
  );

  // Generate slots
  const slotDuration = 30; // minutes
  const startMinutes = timeToMinutes(schedule.start_time);
  const endMinutes = timeToMinutes(schedule.end_time);

  const slots: Array<{
    id: string;
    startTime: string;
    endTime: string;
    status: 'available' | 'booked';
  }> = [];

  for (let time = startMinutes; time + slotDuration <= endMinutes; time += slotDuration) {
    const startTime = minutesToTime(time);
    const endTime = minutesToTime(time + slotDuration);

    // Check if slot overlaps with any break
    const isInBreak = breaks?.some((b) => {
      const breakStart = timeToMinutes(b.start_time);
      const breakEnd = timeToMinutes(b.end_time);
      return time < breakEnd && time + slotDuration > breakStart;
    });

    if (isInBreak) continue;

    const isBooked = bookedTimes.has(startTime);

    slots.push({
      id: generateSlotId(),
      startTime,
      endTime,
      status: isBooked ? 'booked' : 'available',
    });
  }

  const availableCount = slots.filter((s) => s.status === 'available').length;

  return jsonResponse({
    doctorId,
    date,
    slots,
    availableCount,
    totalCount: slots.length,
  });
};
