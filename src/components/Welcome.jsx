import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Welcome = () => {
  const [reunionesSemana, setReunionesSemana] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReunionesSemana();
  }, []);

  const fetchReunionesSemana = async () => {
    try {
      const response = await axios.get('https://vymc-daily-backend.onrender.com/reuniones-semana-actual');
      const reuniones = response.data;

      // Ajustar las fechas para manejar correctamente la zona horaria
      const reunionesFormateadas = reuniones.map(reunion => ({
        ...reunion,
        Fecha: new Date(reunion.Fecha) // Asegurar que la fecha se interprete correctamente
      }));

      setReunionesSemana(reunionesFormateadas);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las reuniones de la semana:', error);
      setError('Error al cargar las reuniones. Por favor, inténtalo nuevamente más tarde.');
      setLoading(false);
    }
  };

  const displayValue = (value) => {
    return value === "No Aplica" ? "" : value;
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner"></div>
        <p></p>
      </div>
    );
  }

  return (
    <div className='container mx-auto mb-4'>
      <h2 className='my-4 text-center font-bold text-3xl'>Asignaciones Reunión de la Semana Actual</h2>
      <div className='overflow-x-auto'>
        <table className="w-full border-collapse border border-gray-500">
          <thead className='bg-gray-500'>
            <tr className='text-center'>
              <th className='px-4 py-2 border border-gray-500'>Sala</th>
              <th className='px-4 py-2 border border-gray-500'>Asignación</th>
              <th className='px-4 py-2 border border-gray-500'>Titular</th>
              <th className='px-4 py-2 border border-gray-500'>Ayudante</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {reunionesSemana.map((reunion, index) => (
              <tr key={index}>
                <td className='px-4 py-2 border border-gray-300'>{reunion.Sala}</td>
                <td className='px-4 py-2 border border-gray-300'>{reunion.Asignacion}</td>
                <td className='px-4 py-2 border border-gray-300'>{reunion.Titular}</td>
                <td className='px-4 py-2 border border-gray-300'>{displayValue(reunion.Ayudante)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Welcome;

