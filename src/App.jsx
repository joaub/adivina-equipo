import { useState } from 'react'
import { EQUIPOS } from './componentes/equipos'


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [equipoActual, setEquipoActual] = useState(EQUIPOS[Math.floor(Math.random() * EQUIPOS.length)]);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const verificar = () => {
    if (respuesta.trim().toLowerCase() === equipoActual.nombre.toLowerCase()) {
      setMensaje("correcto");
    } else {
      setMensaje("incorrecto");
    }
  };

  return (
    <>
      <div className={`absolute inset-0  text-center  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
        } `}>
        <h1 className="text-3xl font-bold">Adivina el equipo por el escudo</h1>
        <button onClick={() => setDarkMode(!darkMode)} className={`px-2 absolute top-5 right-60 border  ${darkMode ? "bg-dark" : "bg-white"}`}  >
          modo {darkMode ? 'oscuro' : 'claro'}
        </button>
        <div>
          <img src={equipoActual.img} alt={EQUIPOS.nombre}
            className='w-40 h-40 p-2' />

          <input
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe el nombre del equipo..."
            className="p-3 w-72 rounded-xl border border-gray-400 text-center"
          />
          <button
            onClick={verificar}
            className="px-10 p-2 border ml-4 rounded-xl bg-blue-500"
          >
            Verificar
          </button>
          
        </div>
      </div>

    </>
  )
}

export default App
