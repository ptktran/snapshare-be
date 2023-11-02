const supabase = require("../node_modules/@supabase/supabase-js");
const supabaseUrl = "https://cmknbeginwvrwzxmgdgy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNta25iZWdpbnd2cnd6eG1nZGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzgyNTA2MSwiZXhwIjoyMDEzNDAxMDYxfQ.zfnHIOKMiZZG01puBM-wtVVnKPtob6jUcV6Mep3Ci_E";
const supaClient = supabase.createClient(supabaseUrl, supabaseKey);

module.exports = { supaClient };
