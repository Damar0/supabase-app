'use client'

import { useEffect, useState } from "react"
import { getPacientById, updatePacient } from "../../create/actions";

export default function EditPacient({ params }) {
    const [pacient, setPacient] = useState(null)
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [alergias, setAlergias] = useState('');
    const [direccion, setDireccion] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const getData = async () => {
            //llamar a la accion
            const pacientResult = await getPacientById(params.id);
            setPacient(pacientResult.pacient);
            if (pacientResult.error) {
                alert(pacientResult.error.message);
            } else {
                // Establecer los valores iniciales de los campos del formulario
                setNombre(pacientResult.pacient.nombre || '');
                setEdad(pacientResult.pacient.edad || '');
                setSexo(pacientResult.pacient.sexo || '');
                setAlergias(pacientResult.pacient.alergias || '');
                setDireccion(pacientResult.pacient.direccion || '');
            }
        };
        getData();
    }, [params.id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar los datos antes de enviarlos
        const validationErrors = {};
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

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatePaciente = {
            id: pacient.id,
            nombre,
            edad,
            sexo,
            alergias,
            direccion,
        };

        const updateResult = await updatePacient(updatePaciente);
        if (updateResult.error) {
            alert(updateResult.error.message);
        } else {
            alert('Datos del paciente actualizados correctamente');
            setPacient(updatePaciente);
        }
    };

    return (
        <div>
            {pacient && (
                <form className="flex flex-col gap-3 mt-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text black">Nombre</label>
                        <input name="nombre" value={nombre} className="text-black border border-gray-500 rounded p-2"
                            onChange={(e) => setNombre(e.target.value)} />
                        {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Edad</label>
                        <input name="edad" value={edad} className="text-black border border-gray-500 rounded p-2"
                            onChange={(e) => setEdad(e.target.value)} />
                        {errors.edad && <span className="text-red-500">{errors.edad}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Sexo</label>
                        <input name="sexo" value={sexo} className="text-black border border-gray-500 rounded p-2"
                            onChange={(e) => setSexo(e.target.value)} />
                        {errors.sexo && <span className="text-red-500">{errors.sexo}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Alergias</label>
                        <input name="alergias" value={alergias} className="text-black border border-gray-500 rounded p-2"
                            onChange={(e) => setAlergias(e.target.alergias)} />
                        {errors.alergias && <span className="text-red-500">{errors.alergias}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Dirección</label>
                        <input name="direccion" value={direccion} className="text-black border border-gray-500 rounded p-2"
                            onChange={(e) => setDireccion(e.target.direccion)} />
                        {errors.direccion && <span className="text-red-500">{errors.direccion}</span>}
                    </div>

                    <button type="submit" className="border rounded-lg bg-sky-600 p-2 text-lg mt-4">Actualizar paciente</button>
                </form>
            )}
        </div>

    );
}