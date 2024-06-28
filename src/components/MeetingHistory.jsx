import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // Importar función necesaria de date-fns

const MeetingHistory = () => {
  const [reuniones, setReuniones] = useState([]);
  const [filtro, setFiltro] = useState({
    fecha: '',
    sala: '',
    asignacion: '',
    titular: '',
    ayudante: '',
    hermano: ''
  });
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const displayValue = (value) => {
    return value === "No Aplica" ? "" : value;
  };

  useEffect(() => {
    fetchReuniones();
  }, []);

  const fetchReuniones = async () => {
    try {
      const response = await axios.get('https://vymc-daily-backend.onrender.com/reuniones');
      const reunionesFormateadas = response.data.map(reunion => ({
        ...reunion,
        Fecha: formatFecha(reunion.Fecha) // Formatear la fecha aquí
      }));
      setReuniones(reunionesFormateadas);
      setLoading(false); // Marcar la carga como completada
    } catch (error) {
      console.error('Error al obtener la lista de reuniones:', error);
      setLoading(false); // Asegurarse de que la carga termine incluso en caso de error
    }
  };

  const formatFecha = (fechaString) => {
    const diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Parsear la fecha de la cadena
    const parsedDate = new Date(fechaString);

    // Obtener día, mes y año
    const dia = parsedDate.getUTCDate().toString().padStart(2, '0');
    const mesIndex = parsedDate.getUTCMonth();
    const mes = (mesIndex + 1).toString().padStart(2, '0');
    const anio = parsedDate.getUTCFullYear().toString();

    // Formar la fecha en el formato dd/mm/yyyy
    return `${dia}/${mes}/${anio}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  const fechasUnicas = [...new Set(reuniones.map(reunion => reunion.Fecha))];
  const salasUnicas = [...new Set(reuniones.map(reunion => reunion.Sala))];
  const asignacionesUnicas = [...new Set(reuniones.map(reunion => reunion.Asignacion))];

  const filtrarReuniones = (reunion) => {
    const { fecha, sala, asignacion, titular, ayudante, hermano } = filtro;

    const filtroFecha = !fecha || reunion.Fecha === fecha;
    const filtroSala = !sala || reunion.Sala === sala;
    const filtroAsignacion = !asignacion || reunion.Asignacion === asignacion;
    const filtroTitular = !titular || reunion.Titular.toLowerCase().includes(titular.toLowerCase());
    const filtroAyudante = !ayudante || reunion.Ayudante.toLowerCase().includes(ayudante.toLowerCase());
    const filtroHermano = !hermano || reunion.Titular.toLowerCase().includes(hermano.toLowerCase()) || reunion.Ayudante.toLowerCase().includes(hermano.toLowerCase());

    return filtroFecha && filtroSala && filtroAsignacion && filtroTitular && filtroAyudante && filtroHermano;
  };

  const limpiarFiltros = () => {
    setFiltro({
      fecha: '',
      sala: '',
      asignacion: '',
      titular: '',
      ayudante: '',
      hermano: ''
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto mb-4">
        <div className="text-center mt-4">
          <div className="spinner"></div>
          <p></p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto mb-4'>
      <h2 className='my-4 text-center font-bold text-3xl'>Programa de Reuniones</h2>
      <div className="flex flex-wrap gap-4 mb-3 items-start">
        <div className="flex items-center">
          <input
            type="text"
            name="hermano"
            value={filtro.hermano}
            onChange={handleChange}
            placeholder="Nombre/Apellido Participante"
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center">
          <select
            name="fecha"
            value={filtro.fecha}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar Fecha</option>
            {fechasUnicas.map((fecha, index) => (
              <option key={index} value={fecha}>{fecha}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <select
            name="sala"
            value={filtro.sala}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar Sala</option>
            {salasUnicas.map((sala, index) => (
              <option key={index} value={sala}>{sala}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <select
            name="asignacion"
            value={filtro.asignacion}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar Asignación</option>
            {asignacionesUnicas.map((asignacion, index) => (
              <option key={index} value={asignacion}>{asignacion}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={limpiarFiltros}
            className="px-4 py-2 bg-gray-500 text-white border border-gray-300 rounded-md shadow-sm"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className="w-full border-collapse border border-gray-500">
          <thead className='bg-gray-500'>
            <tr className='text-center'>
              <th className='px-4 py-2 border border-gray-500'>Fecha</th>
              <th className='px-4 py-2 border border-gray-500'>Sala</th>
              <th className='px-4 py-2 border border-gray-500'>Asignación</th>
              <th className='px-4 py-2 border border-gray-500'>Titular</th>
              <th className='px-4 py-2 border border-gray-500'>Ayudante</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {reuniones.filter(filtrarReuniones).map((reunion, index) => {
              return (
                <tr key={index}>
                  <td className='px-4 py-2 border border-gray-300'>{reunion.Fecha}</td>
                  <td className='px-4 py-2 border border-gray-300'>{reunion.Sala}</td>
                  <td className='px-4 py-2 border border-gray-300'>{reunion.Asignacion}</td>
                  <td className='px-4 py-2 border border-gray-300'>{reunion.Titular}</td>
                  <td className='px-4 py-2 border border-gray-300'>{displayValue(reunion.Ayudante)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingHistory;
