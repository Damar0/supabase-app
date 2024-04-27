//implementar un formulario para cambio de contraseña
//input text contraseña
//input text confirmar contraseña
//botón: cambiar la contraseña
// al guardar validar: 
/*
contraseña tenga valor
contraseña longitud minima de 6 caracteres
contraseña tenga valor(es requerido)
contraseña y confirmar contraseña son iguales/ generar mensaje de error

-guardarla nueva contraseña (ejemplo pendiente)

-Si no está autenticado no mostrar el formulario y llegarlo a /login
*/
"use client"
import { useState } from "react"
import { saveNewPassword } from "./actions"
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function changePassword() {
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const supabase = createClient()
    const router = useRouter()
    /*
    useEffect(() => {
        const getData = async () => {
            //verificar si tiene la sesion iniciada
            const{ data:{ session }} = await supabase.auth.getSession()
            //si no hay sesión
            if(!session) {
                //redireccionarlo al login
                router.push('/login')
            }
        }
        getData()
    }, [])*/
    //estado de errores
    const [errors, setErrors] = useState({});

    function savePassword(form) {
        //evitar el submit
        form.preventDefault();
  
        //realizar la validación
        let errorList = {};

        if (!password) {
            errorList.password = "La contraseña es obligatoria"
        }
        else if (password.length < 6){
            errorList.password = 'La contraseña debe ser almenos de 6 carácteres.'
        }
        if (!confirmPwd) {
            errorList.confirmPwd = "La contraseña es obligatoria"
        }
        else if (confirmPwd != password){
            errorList.confirmPwd = 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.'
        }

        //Contarlas propiedades(keys) de error list
        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }
        console.log("Ir a guardar");

        saveNewPassword(password, confirmPwd)
        .then((result) => {
            //procesar el resultado
            console.log(result);
            alert(result.message);
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        });
    }// fi saveProduct()

    return (
        <form className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2" onSubmit={savePassword}>
            <div className="flex flex-col gap-1">
                <label className="text black">Nueva Contraseña</label>
                <input name="password" type="password" placeholder="Contraseña" className="text-black border border-gray-500 rounded p-2"
                   value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({
                            ...errors,
                            password: '',//limpiar mensaje de error en name
                        });
                    }} />
                    <p className='text-red-500'>{errors.password}</p>

            </div>
            <div className="flex flex-col gap-1">
                <label>Confirmar nueva contraseña</label>
                <input name="ConfirmPwd" type="password" placeholder="Confirmar contraseña" className="text-black border border-gray-500 rounded p-2"
                    value={confirmPwd}
                    onChange={(e) => {
                        setConfirmPwd(e.target.value);
                        setErrors({
                            ...errors,
                            confirmPwd: '',//limpiar mensaje de error en name
                        })
                    }}  />
                    <p className='text-red-500'>{errors.confirmPwd}</p>
            </div>
            <button type="submit" className="border rounded-lg bg-lime-600 p-2 text-lg mt-4">Cambiar Contraseña</button>
        </form>
    )
}