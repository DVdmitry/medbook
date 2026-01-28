import type { Handler } from '@netlify/functions';
import { supabase, jsonResponse, errorResponse, corsHeaders } from './lib/supabase';

function generateAppointmentId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const seq = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `APT-${date}-${seq}`;
}

function generateConfirmationNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'CONF-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  const path = event.path
    .replace('/.netlify/functions/appointments', '')
    .replace('/api/appointments', '');
  const appointmentId = path.replace('/', '');

  // GET /api/appointments/:id
  if (event.httpMethod === 'GET' && appointmentId) {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*, doctors(*)')
      .eq('id', appointmentId)
      .single();

    if (error || !appointment) {
      return errorResponse('Appointment not found', 'NOT_FOUND', 404);
    }

    return jsonResponse({
      appointmentId: appointment.id,
      confirmationNumber: appointment.confirmation_number,
      status: appointment.status,
      doctor: {
        id: appointment.doctors.id,
        name: appointment.doctors.name,
        specialty: appointment.doctors.specialty_label,
      },
      patient: {
        firstName: appointment.first_name,
        lastName: appointment.last_name,
        email: appointment.email,
        phone: appointment.phone,
      },
      slot: {
        date: appointment.slot_date,
        startTime: appointment.slot_start_time,
        endTime: appointment.slot_end_time,
      },
      reason: appointment.reason,
      consultationFee: parseFloat(appointment.doctors.consultation_fee),
      createdAt: appointment.created_at,
    });
  }

  // POST /api/appointments
  if (event.httpMethod === 'POST') {
    const idempotencyKey = event.headers['x-idempotency-key'];

    // Check for duplicate request
    if (idempotencyKey) {
      const { data: existing } = await supabase
        .from('appointments')
        .select('id, confirmation_number')
        .eq('idempotency_key', idempotencyKey)
        .single();

      if (existing) {
        return jsonResponse({
          appointmentId: existing.id,
          confirmationNumber: existing.confirmation_number,
          status: 'confirmed',
          message: 'Appointment already exists (idempotent response)',
        });
      }
    }

    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return errorResponse('Invalid JSON body', 'INVALID_BODY', 400);
    }

    const { doctorId, slotId, slotDate, slotStartTime, patient, medicalInfo, reason, notes } = body;

    // Validate required fields
    if (!doctorId || !patient?.firstName || !patient?.lastName || !patient?.email || !reason) {
      return errorResponse('Missing required fields', 'VALIDATION_ERROR', 400);
    }

    // Get doctor info for response
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', doctorId)
      .single();

    if (doctorError || !doctor) {
      return errorResponse('Doctor not found', 'DOCTOR_NOT_FOUND', 404);
    }

    // Generate IDs
    const appointmentIdGen = generateAppointmentId();
    const confirmationNumber = generateConfirmationNumber();
    const finalSlotId = slotId || `slot_${Date.now()}`;
    const finalSlotDate = slotDate || new Date().toISOString().slice(0, 10);
    const finalStartTime = slotStartTime || '09:00';

    // Calculate end time (30 min slots)
    const [hours, minutes] = finalStartTime.split(':').map(Number);
    const endMinutes = hours * 60 + minutes + 30;
    const slotEndTime = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;

    // Create slot first (FK constraint requires slot to exist)
    const { error: slotError } = await supabase
      .from('slots')
      .upsert({
        id: finalSlotId,
        doctor_id: doctorId,
        date: finalSlotDate,
        start_time: finalStartTime,
        end_time: slotEndTime,
        status: 'booked',
        appointment_id: appointmentIdGen,
      });

    if (slotError) {
      console.error('Slot error:', slotError);
      return errorResponse('Failed to reserve slot', 'SLOT_ERROR', 500);
    }

    // Create appointment
    const { error: insertError } = await supabase.from('appointments').insert({
      id: appointmentIdGen,
      confirmation_number: confirmationNumber,
      doctor_id: doctorId,
      slot_id: finalSlotId,
      slot_date: finalSlotDate,
      slot_start_time: finalStartTime,
      slot_end_time: slotEndTime,
      first_name: patient.firstName,
      last_name: patient.lastName,
      email: patient.email,
      phone: patient.phone || '',
      date_of_birth: patient.dateOfBirth || null,
      medical_info: medicalInfo ? JSON.stringify(medicalInfo) : null,
      reason,
      notes: notes || null,
      idempotency_key: idempotencyKey || null,
      status: 'confirmed',
    });

    if (insertError) {
      console.error('Insert error:', insertError);
      return errorResponse('Failed to create appointment', 'DATABASE_ERROR', 500);
    }

    return jsonResponse({
      appointmentId: appointmentIdGen,
      confirmationNumber,
      status: 'confirmed',
      message: 'Appointment booked successfully',
      details: {
        doctor: {
          name: doctor.name,
          specialty: doctor.specialty_label,
        },
        dateTime: `${slotDate || new Date().toISOString().slice(0, 10)}T${slotStartTime || '09:00'}:00`,
        duration: 30,
        consultationFee: parseFloat(doctor.consultation_fee),
      },
    });
  }

  return errorResponse('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
};
