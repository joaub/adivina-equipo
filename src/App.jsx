import { useState } from 'react'
import { EQUIPOS } from './componentes/equipos'


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [equipoActual, setEquipoActual] = useState(EQUIPOS[Math.floor(Math.random() * EQUIPOS.length)]);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const verificar = () => {
    if (respuesta.trim() === "") {
      setMensaje("respuesta vacia");
      return;
    }
    if (respuesta.trim().toLowerCase() === equipoActual.nombre.toLowerCase()) {
      setMensaje("correcto");
    } else {
      setMensaje("incorrecto");
    }
  };

  const siguiente = () => {
    setEquipoActual(EQUIPOS[Math.floor(Math.random() * EQUIPOS.length)]);
    setRespuesta("");
    setMensaje(null);
  };

  return (
    <>
      <div className={`min-h-screen flex flex-col items-center p-5  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
        } `}>
        <h1 className="text-3xl font-bold p-4">Adivina el equipo por el escudo</h1>
        <button onClick={() => setDarkMode(!darkMode)} className={`px-2 absolute top-5 right-60 border  ${darkMode ? "bg-dark" : "bg-white"}`}  >
          modo {darkMode ? 'oscuro' : 'claro'}
        </button>
        <div>
          <img src={equipoActual.img} alt={EQUIPOS.nombre}
            className='w-50 h-50 items-center rounded-xl blur-sm m-4' />

          <div className='p-5 mt-7'>
            <input
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              placeholder="Escribe el nombre del equipo..."
              className={` w-72 rounded-xl border border-gray-400 text-center  ${darkMode ? "bg-gray-600 text-white" : "bg-white text-black"}`}
            />
            <button
              onClick={verificar}
              className="px-10  border ml-4 rounded-xl bg-blue-500"
            >
              Verificar
            </button>
            {mensaje === "correcto" && (
              <p className="text-green-400 text-xl font-semibold">¡Correcto! 🎉</p>
            )}

            {mensaje === "incorrecto" && (
              <p className="text-red-400 text-xl font-semibold">
                Incorrecto 😢 intenta otra vez
              </p>
            )}
            {mensaje === "respuesta vacia" && (
              <p className="text-yellow-400 text-xl font-semibold">
                Por favor ingresa una respuesta ⚠️
              </p>
            )}

          </div>
          {mensaje !== "respuesta vacia" && mensaje !== "" && mensaje !== "incorrecto" &&(
            <button
              onClick={siguiente}
              className="px-6 py-2 border rounded-lg "
            >
              Siguiente
            </button>
          )}

        </div>
      </div>

    </>
  )
}

export default App
