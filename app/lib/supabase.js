import { createClient } from '@supabase/supabase-js';

const URL = 'https://bldaceedcmruwnpnsams.supabase.co';
const KEY = 'sb_publishable_M_dOwweO_RnzcVs8r34Gaw_JuD-d9_W';

export const supabase = createClient(URL, KEY);
