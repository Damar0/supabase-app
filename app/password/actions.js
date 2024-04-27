"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function saveNewPassword(password,confirmPwd){
//validae la contraseña como en el front

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.updateUser({ password: password })

    if(error){
        return{
            success: false,
            message: `No se pudo guardar la nueva contraseña ${error.message}`,
            errors:null,
        }
    }
    return{
        success: true,
        message: `La contraseña ha sido actualizada correctamente.`,
        errors:null,
    }
}