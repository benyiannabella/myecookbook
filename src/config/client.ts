import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uyeldeqfgixvowdwujmf.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZWxkZXFmZ2l4dm93ZHd1am1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4Njc2MTAsImV4cCI6MjA0NzQ0MzYxMH0.jz_9WDF4pNN64ZvRJ-dmTDW4x8lQbiduwYFS5uxlPyw';
export const supabase = createClient(supabaseUrl, supabaseKey);
