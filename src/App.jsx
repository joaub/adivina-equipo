import { useState, useEffect } from 'react'
import { LIGA_ESPAÑOLA, LIGA_ARGENTINA, PREMIER_LEAGUE,SERIE_A } from './componentes/equipos'
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
  const [racha, setRacha] = useState(0);
  const [yaAcertado, setYaAcertado] = useState(false);
  const [ligaActual, setLigaActual] = useState(null);
  const [pista, setPista] = useState(null);
  const [pistaUsada, setPistaUsada] = useState(false);
  const [tabla, setTabla] = useState(() => {
    try {
      const saved = localStorage.getItem("tablaPuntajes");

      if (!saved) return [];

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  
const TIEMPO_POR_EQUIPO = 30;
const [tiempo, setTiempo] = useState(TIEMPO_POR_EQUIPO);
const [timerActivo, setTimerActivo] = useState(false);


  const guardarPuntaje = () => {
    const entrada = {
      liga: ligaActual,
      puntos: puntos,
      fecha: new Date().toLocaleDateString(),
    };


    const nuevaTabla = [...tabla, entrada];
    setTabla(nuevaTabla);
    localStorage.setItem("tablaPuntajes", JSON.stringify(nuevaTabla));
  };

  useEffect(() => {
  if (!timerActivo || perdiste || completado) return;

  const interval = setInterval(() => {
    setTiempo(prev => {
      if (prev <= 1) {
        manejarTiempoAgotado();
        return TIEMPO_POR_EQUIPO;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [timerActivo, perdiste, completado]);


const manejarTiempoAgotado = () => {
  setVidas(prev => {
    const nuevas = prev - 1;

    if (navigator.vibrate) navigator.vibrate(300);

    if (nuevas <= 0) {
      setPerdiste(true);
      guardarPuntaje();
    }

    return nuevas;
  });
};


  const verificar = () => {
    if (mensaje === "correcto") return;

    if (respuesta.trim() === "") {
      setMensaje("respuesta vacia");
      return;
    }
    if (respuesta.trim().toLowerCase() === equipoActual.nombre.toLowerCase()) {
      setMensaje("correcto");

      const manejarAcierto = () => {
        if (yaAcertado) return; // evita que siga sumando

        let puntosGanados = 0;

        if (racha === 0) {
          puntosGanados = 1;
        } else {
          puntosGanados = 1 + racha;
        }

        setPuntos(prev => prev + puntosGanados);
        setRacha(prev => prev + 1);
        setYaAcertado(true);
        setTimerActivo(false)
      };
      manejarAcierto();
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
          guardarPuntaje(seleccionarLiga, puntos);

        }

        return nuevas;
      });
    }
  };

  const seleccionarLiga = (ligaArray, nombre) => {
    const copia = [...ligaArray];
    const random = copia.splice(Math.floor(Math.random() * copia.length), 1)[0];

    setLigaActual(nombre);
    setLigaSeleccionada(ligaArray);
    setEquipoActual(random);
    setEquiposRestantes(copia.filter(e => e !== random));
    setCompletado(false);
    setRespuesta("");
    setMensaje("");
    setPerdiste(false);
    setCompletado(false);

    setPuntos(0);
    setRacha(0);
    setTiempo(TIEMPO_POR_EQUIPO);
    setTimerActivo(true);
  };

  const siguiente = () => {
    if (equiposRestantes.length === 0) {
      setCompletado(true);
      guardarPuntaje(seleccionarLiga, puntos);
      return;
    }
    const copia = [...equiposRestantes];
    const random = copia[Math.floor(Math.random() * copia.length)];

    setEquipoActual(random);
    setEquiposRestantes(copia.filter(e => e !== random));
    setRespuesta("");
    setMensaje("");
    setVidas(3);
    setYaAcertado(false);
    setPista(null);
    setPistaUsada(false);
    setTiempo(TIEMPO_POR_EQUIPO);
    setTimerActivo(true);
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
    setRacha(0);
    setPista(null);
    setPistaUsada(false);
    setTimerActivo(false);
    setTiempo(TIEMPO_POR_EQUIPO);
  };
  const generarPista = () => {
    const nombre = equipoActual.nombre.replace(/\s+/g, "");
    const randomIndex = Math.floor(Math.random() * nombre.length);
    const letra = nombre[randomIndex].toUpperCase();

    setPista(letra);
    setPistaUsada(true);
  };

  

  return (
    <>
      <div
        className={`min-h-screen flex flex-col items-center p-5  ${darkMode ? "bg-blue-900 text-white" : "bg-sky-300 text-black"
          }`}
      >
        {!ligaSeleccionada && (
          <LigaSelector
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            seleccionarLiga={seleccionarLiga}
            LIGA_ARGENTINA={LIGA_ARGENTINA}
            LIGA_ESPAÑOLA={LIGA_ESPAÑOLA}
            tabla={tabla}
            setTabla={setTabla}
            PREMIER_LEAGUE={PREMIER_LEAGUE}
            SERIE_A={SERIE_A}
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
            racha={racha}
            pista={pista}
            setPista={setPista}
            generarPista={generarPista}
            pistaUsada={pistaUsada}
            tiempo={tiempo}
          />
        )}

      </div>

    </>
  )
}

export default App
