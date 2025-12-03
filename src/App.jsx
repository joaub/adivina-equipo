import { useState } from 'react'
import { LIGA_ARGENTINA } from './componentes/equipos'


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);
  const [equipoActual, setEquipoActual] = useState(null);
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

  const seleccionarLiga = (ligaArray) => {
    setLigaSeleccionada(ligaArray);
    setEquipoActual(ligaArray[Math.floor(Math.random() * ligaArray.length)]);
  };

  const siguiente = () => {
    const equipos = ligaSeleccionada;
    setEquipoActual(equipos[Math.floor(Math.random() * equipos.length)]);
    setRespuesta("");
    setMensaje("");
  };

  return (
    <>
      <div className={`min-h-screen flex flex-col items-center p-5  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
        } `}>

        {!ligaSeleccionada && (
          <div>
            <h1 className="text-3xl font-bold p-4">Adivina el equipo por el escudo</h1>
            <button onClick={() => setDarkMode(!darkMode)} className={`px-2 absolute top-5 right-60 border  ${darkMode ? "bg-dark" : "bg-white"}`}  >
              modo {darkMode ? 'oscuro' : 'claro'}
            </button>
            <button onClick={() => seleccionarLiga(LIGA_ARGENTINA)}>Liga Argentina</button>
          </div>
        )}
        <div>
          {ligaSeleccionada && equipoActual && (
            <div>

              <img src={equipoActual.img}
                className='w-50 h-50 items-center rounded-xl blur-sm m-4 bg-white' />

              
              <p className="text-3xl text-center mt-4 p-2 ">
                {equipoActual.nombre
                  .split("")
                  .map(c => (c === " " ? "\u00A0\u00A0"  // agrega un espacio visible
                    : "_ "))
                  .join(" ")}
              </p>

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
              </div>


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
          )}
          {mensaje !== "respuesta vacia" && mensaje !== "" && mensaje !== "incorrecto" && (
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
