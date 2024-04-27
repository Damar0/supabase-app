'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
    const [notes, setNotes] = useState(null)
    const supabase = createClient()

    //estado para guardar el criterio de busqueda
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }
        getData()
    }, [])
    //función buscar
    function handleSubmit(e) {
        //evitar enviar el formulario
        e.preventDefault();

        //ir a buscar
        const getData = async () => {
            const { data } = await supabase
                .from('notes')
                .select()
                .like('title', `%${search}%`);

            setNotes(data)
        }
        getData()
    }

    return (
        <div className='py-6'>
            <h1 className='font-bold text-center text-lg'>Notas</h1>
            <form
                className='text-center mt-3'
                onSubmit={handleSubmit}>
                <input placeholder='Buscar'
                    className='border rounded px-2 text-black'
                    defaultValue={search}
                    onChange={(e) => {
                        setSearch(
                            e.target.value //el valor del input lo enviamos a search
                        );
                    }} />
            <button type='submit' className='rounded-md bg-sky-400 px-3 ml-3 text-lg text-black py-2'>Buscar</button>
            </form>
            <ul className='mt-4 py-4'>
                {notes?.map((note) => (
                    <li
                        key={note.id}
                        className='text-lg border rounded-lg p-2 mb-3 text-black bg-purple-300'
                    >{note.title}</li>
                ))}
            </ul>
        </div>
    );

}