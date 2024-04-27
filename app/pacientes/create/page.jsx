"use client"

import { useState } from "react"
import { createPacient } from "./actions"

export default function CreatePacient() {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [alergias, setAlergias] = useState('');
    const [direccion, setDireccion] = useState('');

    //estado de errores
    const [errors, setErrors] = useState({});

    function savePacient(form) {
        form.preventDefault();
  
        //Validación
        let errorList = {};
        if (!nombre) {
            errorList.nombre = "El Nombre es obligatorio"
        }
        if (!edad) {
            errorList.edad = "La Edad del paciente es obligatoria"
        }
        if (!sexo) {
            errorList.sexo = "El genero es obligatorio";
        }
        if (!alergias) {
            errorList.alergias = "Este campo no puede quedar vacío";
        }
        if (!direccion) {
            errorList.direccion = "La dirección es obligatoria";
        }

        //Contarlas propiedades(keys) de error list
        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }

        createPacient({
            nombre,
            edad,
            sexo,
            alergias,
            direccion,
        })
        .then((result) => {
            console.log(result);
            alert(result.message);
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        });
    }

    return (
        <form className="flex flex-col gap-3 mt-8" onSubmit={savePacient}>
            <div className="flex flex-col gap-1">
                <p className="text-3xl">Agregar un nuevo paciente</p>
                <label className="text-lg">Nombre completo</label>
                <input name="nombre" placeholder="Nombre del paciente" className="text-black border border-gray-500 rounded p-2"
                    value={nombre}
                    onChange={(e) => {
                        setNombre(e.target.value);
                        setErrors({
                            ...errors,
                            nombre: '',
                        });
                    }} />
                <p className='text-red-500'>{errors.nombre}</p>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-lg">Edad</label>
                <input name="edad" placeholder="Edad del Paciente" className="text-black border border-gray-500 rounded p-2"
                    value={edad}
                    onChange={(e) => {
                        setEdad(e.target.value);
                        setErrors({
                            ...errors,
                            edad: '',
                        })
                    }} />
                <p className='text-red-500'>{errors.edad}</p>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-lg">Género</label>
                <input name="sexo" placeholder="Masculino/femenino" className="text-black border border-gray-500 rounded p-2"
                    value={sexo}
                    onChange={(e) => {
                        setSexo(e.target.value);
                        setErrors({
                            ...errors,
                            sexo: '',
                        })
                    }} />
                <p className='text-red-500'>{errors.sexo}</p>
            </div>
            
            <div className="flex flex-col gap-1">
                <label className="text-lg">Alergias</label>
                <input name="alergias" placeholder="Alergias conocidas" className="text-black border border-gray-500 rounded p-2"
                    value={alergias}
                    onChange={(e) => {
                        setAlergias(e.target.value);
                        setErrors({
                            ...errors,
                            alergias: '',
                        })
                    }} />
                <p className='text-red-500'>{errors.alergias}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-lg">Dirección</label>
                <input name="direccion" placeholder="Dirección" className="text-black border border-gray-500 rounded p-2"
                    value={direccion}
                    onChange={(e) => {
                        setDireccion(e.target.value);
                        setErrors({
                            ...errors,
                            direccion: '',
                        })
                    }} />
                <p className='text-red-500'>{errors.direccion}</p>
            </div>
            <button type="submit" className="border rounded-lg bg-[#d0d1fa] p-2 text-xl text-black mt-4">Registrar Paciente</button>
        </form>
    )
}