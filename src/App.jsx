import { useState } from 'react'
import { LIGA_ESPAÑOLA, LIGA_ARGENTINA } from './componentes/equipos'
import LigaSelector from "./componentes/elegirLiga";
import Juego from "./componentes/juego";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);
  const [equipoActual, setEquipoActual] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [equiposRestantes, setEquiposRestantes] = useState([]);
  const [completado, setCompletado] = useState(false);
  const [vidas, setVidas] = useState(3);
  const [perdiste, setPerdiste] = useState(false);
  const [puntos, setPuntos] = useState(0);

  const verificar = () => {
    if (mensaje === "correcto") return;
    
    if (respuesta.trim() === "") {
      setMensaje("respuesta vacia");
      return;
    }
    if (respuesta.trim().toLowerCase() === equipoActual.nombre.toLowerCase()) {
      setMensaje("correcto");
      setPuntos(p => p + 1);
      return;
    } else {
      setMensaje("incorrecto");
      setVidas(prev => {
        const nuevas = prev - 1;

        if (navigator.vibrate) {
        navigator.vibrate(300); // vibra 300 ms
        console.log(navigator.vibrate ? "Soporta vibración" : "NO soporta vibración");
      }


        if (nuevas <= 0) {
          setPerdiste(true);
        }

        return nuevas;
      });
    }
  };

  const seleccionarLiga = (ligaArray) => {
    const copia = [...ligaArray];
    const random = copia[Math.floor(Math.random() * copia.length)];

    setLigaSeleccionada(ligaArray);
    setEquipoActual(random);
    setEquiposRestantes(copia.filter(e => e !== random));
    setCompletado(false);
    setRespuesta("");
    setMensaje("");
  };

  const siguiente = () => {
    if (equiposRestantes.length === 0) {
      setCompletado(true);
      return;
    }
    const copia = [...equiposRestantes];
    const random = copia[Math.floor(Math.random() * copia.length)];

    setEquipoActual(random);
    setEquiposRestantes(copia.filter(e => e !== random));
    setRespuesta("");
    setMensaje("");
    setVidas(3);
  };

  const reiniciar = () => {
    setLigaSeleccionada(null);
    setEquipoActual(null);
    setEquiposRestantes([]);
    setCompletado(false);
    setRespuesta("");
    setMensaje("");
    setVidas(3);
    setPerdiste(false);
    setPuntos(0); 
  };

  return (
    <>
      <div
        className={`min-h-screen flex flex-col items-center p-5 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
      >
        {!ligaSeleccionada && (
          <LigaSelector
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            seleccionarLiga={seleccionarLiga}
            LIGA_ARGENTINA={LIGA_ARGENTINA}
            LIGA_ESPAÑOLA={LIGA_ESPAÑOLA}
          />
        )}

        {ligaSeleccionada && equipoActual && (
          <Juego
            darkMode={darkMode}
            equipoActual={equipoActual}
            respuesta={respuesta}
            setRespuesta={setRespuesta}
            mensaje={mensaje}
            verificar={verificar}
            siguiente={siguiente}
            reiniciar={reiniciar}
            completado={completado}
            vidas={vidas}
            perdiste={perdiste}
            puntos={puntos} 
          />
        )}
        
      </div>

    </>
  )
}

export default App
