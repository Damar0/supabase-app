"use client"
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getPacientById } from "../create/actions";


import "react-image-gallery/styles/css/image-gallery.css";

export default function PacientPage({ params }) {

    const [pacient, setPacient] = useState(null);

    useEffect(() => {
        const getData = async () => {
            //llamar a la accion
            const pacientResult = await getPacientById(params.id);
            setPacient(pacientResult.pacient);
            if (pacientResult.error) {
                alert(pacientResult.error.message);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <p className='font-bold text-center text-3xl text-fuchsia-100'>Información del paciente</p>
            <b>{pacient?.name}</b>
            <div className='max-w-28 mx-auto'>{pacient ? (
                <ImageGallery items={pacient.gallery} />
            ) : null}
            </div>
            <div>
            <p><strong>Nombre: </strong>{pacient.nombre}</p>
            <p><strong>Edad: </strong>{pacient.edad}</p>
            <p><strong>Sexo: </strong>{pacient.sexo}</p>
            <p><strong>Alergias: </strong>{pacient.alergias}</p>
            <p><strong>Dirección: </strong>{pacient.direccion}</p>
            </div>
        </div>
    )

}