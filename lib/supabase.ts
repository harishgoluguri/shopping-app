import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imvagofypivmtbuylqqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFnb2Z5cGl2bXRidXlscXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODI1NjEsImV4cCI6MjA4MDc1ODU2MX0.knAE0BuSEFfSKaEPF3QQ7MFdzSL1iZhVf9_ow4XYjWM';

export const supabase = createClient(supabaseUrl, supabaseKey);