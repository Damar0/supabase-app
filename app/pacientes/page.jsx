'use client'
import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { createClient } from '@/utils/supabase/client';
import { pacientList } from './actions';
import { getPacientById } from '../pacientes/create/actions';

export default function Page() {
  const [pacients, setPacients] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPacient, setSelectedPacient] = useState(null);
  const supabase = createClient();
 
  const images = [
    {
      original: 'https://awzdtxddiycobgohdopn.supabase.co/storage/v1/object/public/gallery/hospital/hospital/hospital4.jpg',
      thumbnail: 'https://awzdtxddiycobgohdopn.supabase.co/storage/v1/object/public/gallery/hospital/hospital/hospital4.jpg',
      originalAlt: 'Hospital Maria Candelaria',
      thumbnailAlt: 'Hospital Maria Candelaria'
    },
    {
      original: 'https://awzdtxddiycobgohdopn.supabase.co/storage/v1/object/public/gallery/hospital/hospital/hospital2.jpg',
      thumbnail: 'https://awzdtxddiycobgohdopn.supabase.co/storage/v1/object/public/gallery/hospital/hospital/hospital2.jpg',
      originalAlt: 'Hospital Maria Candelaria',
      thumbnailAlt: 'Hospital Maria Candelaria'
    },
    {
      original: 'https://awzdtxddiycobgohdopn.supabase.co/storage/v1/object/public/gallery/hospital/hospital/hospital3.jpg',
      thumbnail: 'https://awzdtxddiycobgohdopn.supabase.co/storage/v1/object/public/gallery/hospital/hospital/hospital3.jpg',
      originalAlt: 'Hospital Maria Candelaria',
      thumbnailAlt: 'Hospital Maria Candelaria'
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const dataResult = await pacientList();
        setPacients(dataResult.pacients || []);
      } catch (error) {
        alert(error.message);
      }
    };

    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        const { data } = await supabase.from('pacientes').select().like('nombre', `%${search}%`);
        setPacients(data);
      } catch (error) {
        alert(error.message);
      }
    };

    getData();
  };

  const handleDetailsClick = async (pacient) => {
    try {
      const pacientResult = await getPacientById(pacient.id);
      setSelectedPacient(pacientResult.pacient);
      setIsModalOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='py-6'>
      <p className='font-bold text-center text-3xl'>Hospital Maria Candelaria</p>
      <div className='max-w-sm mx-auto'>
        <ImageGallery items={images} />
      </div> <br /><br />
      <h1 className='font-bold text-center text-3xl'>Lista de pacientes</h1> <br />
      <form className='text-center mt-3' onSubmit={handleSubmit}>
        <input
          placeholder='Buscar'
          className='border rounded px-2 text-black text-xl'
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='rounded-full bg-[#701a75] px-4 ml-3 text-xl'>
          Buscar
        </button> <br /><br />
      </form>
      <ul className='mt-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
        {pacients?.map((pacient) => (
          <li key={pacient.id} className='border rounded-lg p-2 mb-3 bg-[#fdf4ff] text-black'>
            <p className='font-bold'>{pacient.name}</p>
            <p>
              <strong>Nombre: </strong>
              {pacient.nombre}
            </p>
            <button
              onClick={() => handleDetailsClick(pacient)}
              className='rounded-full bg-[#701a75] px-4 mt-2 text-white'
            >
              Detalles
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedPacient && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-black p-6 max-w-2xl w-full'>
            <PacientPage pacient={selectedPacient} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function PacientPage({ pacient, onClose }) {
  return (
    <div>
      <p className='font-bold text-center text-3xl text-fuchsia-100'>Información del paciente</p>
      <b>{pacient?.name}</b>
      <div className='max-w-60 mx-auto'>
        {pacient ? <ImageGallery items={pacient.gallery} /> : null}
      </div>
      <div>
        <p>
          <strong>Nombre: </strong>
          {pacient.nombre}
        </p>
        <p>
          <strong>Edad: </strong>
          {pacient.edad}
        </p>
        <p>
          <strong>Sexo: </strong>
          {pacient.sexo}
        </p>
        <p>
          <strong>Alergias: </strong>
          {pacient.alergias}
        </p>
        <p>
          <strong>Dirección: </strong>
          {pacient.direccion}
        </p>
      </div>
      <button className='rounded-full bg-[#701a75] px-4 mt-2 text-white' onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
}
