
import dotenv from 'dotenv';
dotenv.config(); 

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmknbeginwvrwzxmgdgy.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


console.log('Supabase database connected successfully.');

export { supabase };