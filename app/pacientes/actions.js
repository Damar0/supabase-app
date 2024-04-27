"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function pacientList(){
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {data, error} = await supabase
    .from('pacientes')
    .select();



    return{
        pacients:data,
        error,
    }
}