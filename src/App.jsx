import { useState, useEffect } from 'react'
import { LIGA_ESPAÑOLA, LIGA_ARGENTINA, PREMIER_LEAGUE, SERIE_A } from './componentes/equipos'
import LigaSelector from "./componentes/elegirLiga";
import Juego from "./componentes/juego";
import ThemeSelector from './componentes/theme';
import './index.css'
import Dificultad from './componentes/dificultad';


function App() {
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);
  const [equipoActual, setEquipoActual] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [equiposRestantes, setEquiposRestantes] = useState([]);
  const [completado, setCompletado] = useState(false);
  const [vidas, setVidas] = useState(3);
  const [perdiste, setPerdiste] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [yaAcertado, setYaAcertado] = useState(false);
  const [ligaActual, setLigaActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

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

  const TIEMPO_POR_EQUIPO = 20;
  const [tiempo, setTiempo] = useState(TIEMPO_POR_EQUIPO);
  const [timerActivo, setTimerActivo] = useState(false);
  const [dificultad, setDificultad] = useState(null);

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

  const DIFICULTADES = {
    facil: {
      opciones: 3,
      tiempo: 30,
      blur: "blur-sm"
    },
    normal: {
      opciones: 4,
      tiempo: 20,
      blur: "blur-md"
    },
    dificil: {
      opciones: 8,
      tiempo: 20,
      blur: "blur-lg"
    }
  }

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

  useEffect(() => {
    if (!equipoActual || !ligaSeleccionada || !dificultad) return;

    const cantidad = DIFICULTADES[dificultad].opciones;

    let incorrectos = ligaSeleccionada
      .filter(e => e.nombre !== equipoActual.nombre)
      .sort(() => Math.random() - 0.5)
      .slice(0, cantidad - 1);

    let opcionesFinales = [equipoActual, ...incorrectos]
      .sort(() => Math.random() - 0.5);

    setOpciones(opcionesFinales);



  }, [equipoActual, ligaSeleccionada, dificultad]);



  const elegirOpciones = (opcion) => {
    if (mensaje === "correcto") return;


    if (opcion.nombre === equipoActual.nombre) {
      setMensaje("correcto");
      setOpcionSeleccionada(opcion.nombre);

      let puntosGanados = racha === 0 ? 1 : 1 + racha;
      let bonusTiempo = tiempo >= 10 ? 2 : tiempo >= 5 ? 1 : 0;

      setPuntos(prev => prev + puntosGanados + bonusTiempo);
      setRacha(prev => prev + 1);
      setYaAcertado(true);
      setTimerActivo(false);

    } else {
      setMensaje("incorrecto");
      setOpcionSeleccionada(opcion.nombre);
      setVidas(prev => {
        const nuevas = prev - 1;


        if (navigator.vibrate) {
          navigator.vibrate(300); // vibra 300 ms
          console.log(navigator.vibrate ? "Soporta vibración" : "NO soporta vibración");
        }


        if (nuevas <= 0) {
          setPerdiste(true);
          guardarPuntaje(seleccionarLiga, puntos);
          setOpcionSeleccionada(equipoActual.nombre);
          return 0;
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
    setEquiposRestantes(copia);

    setMensaje("");
    setPerdiste(false);
    setCompletado(false);

    setPuntos(0);
    setRacha(0);
    setTiempo(DIFICULTADES[dificultad].tiempo);
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

    setMensaje("");

    setYaAcertado(false);
    setOpciones([]);
    setOpcionSeleccionada(null);
    setTiempo(DIFICULTADES[dificultad].tiempo);
    setTimerActivo(true);

  };

  const reiniciar = () => {
    setLigaSeleccionada(null);
    setEquipoActual(null);
    setEquiposRestantes([]);
    setCompletado(false);

    setMensaje("");
    setVidas(3);
    setPerdiste(false);
    setPuntos(0);
    setRacha(0);

    setTimerActivo(false);
    setTiempo(DIFICULTADES[dificultad].tiempo);
    setDificultad(null);
  };




  return (
    <>
      <div className="min-h-screen text-[var(--color-text)] p-4 flex flex-col items-center"
        style={{ background: "var(--color-bg)" }}>

        <div className="absolute top-4 right-4 z-50">
          <ThemeSelector />
        </div>

        {!dificultad && (
          <Dificultad 
            setDificultad={setDificultad}
          
          />
        )}

        {!ligaSeleccionada && dificultad && (
          <LigaSelector

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

            equipoActual={equipoActual}

            mensaje={mensaje}

            siguiente={siguiente}
            reiniciar={reiniciar}
            completado={completado}
            vidas={vidas}
            perdiste={perdiste}
            puntos={puntos}
            racha={racha}
            opciones={opciones}
            elegirOpciones={elegirOpciones}
            tiempo={tiempo}
            opcionSeleccionada={opcionSeleccionada}
          />
        )}

      </div>

    </>
  )
}

export default App
