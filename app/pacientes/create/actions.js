"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function createPacient(pacients){
    //mandar a guardar los datos en la BD
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
    .from('pacientes')
    .insert([
        pacients
    ])
    .select()

    //retornar respuesta del resultado de la acción
    if(error){
        return{
            success: false,
            message: `Ocurrió un error al guardar los datos del paciente. ${error.message}`,
            errors:null,
        }
    }
    return{
        success: true,
        message: `El paciente se ha guardado`,
        errors:null,
    }
}

export async function getPacientById(id){
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {data, error} = await supabase
    .from('pacientes')
    .select()
    .eq("id", id)
    .single();

    return{
        pacient:data,
        error,
    };
}

export async function updatePacient(pacient){
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Guardar los cambios en los datos del producto
    const {data, error} = await supabase
        .from('pacientes')
        .update({
            ...pacient
        })
        .eq('id', pacient.id)
        .single();

    return {
        pacient: data,
        error
    };
}