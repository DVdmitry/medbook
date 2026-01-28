import type { Handler } from '@netlify/functions';
import { jsonResponse, corsHeaders } from './lib/supabase';

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  return jsonResponse({
    status: 'healthy',
    service: 'medbook-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
};
