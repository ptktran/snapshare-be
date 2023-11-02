require('dotenv').config() 
const supabase = require("../node_modules/@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supaClient = supabase.createClient(supabaseUrl, supabaseKey);

module.exports = { supaClient };
