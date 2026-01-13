import { SERIE_A } from "./equipos";


export default function LigaSelector({ 
    seleccionarLiga, LIGA_ARGENTINA, LIGA_ESPAÑOLA, 
    tabla, setTabla, PREMIER_LEAGUE,SERIE_A }) {


    const eliminarHistorial = () => {
        if (window.confirm("¿Seguro que querés borrar el historial de puntajes?")) {
            setTabla([]);  // Vacía la tabla en el estado
            localStorage.removeItem("tablaPuntajes"); // Borra del localStorage
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold p-4">Adivina el equipo por el escudo</h1>

           

            <div className="p-2 m-3 flex flex-col gap-3">
                <button
                    onClick={() => seleccionarLiga(LIGA_ARGENTINA, "Liga Argentina")}
                    className="text-xl font-bold border bg-blue-400 rounded-xl"
                >
                    Liga Argentina
                </button>

                <button
                    onClick={() => seleccionarLiga(LIGA_ESPAÑOLA, "LaLiga España")}
                    className="text-xl font-bold border bg-blue-400 rounded-xl"
                >
                    LaLiga España
                </button>
                <button
                    onClick={() => seleccionarLiga(PREMIER_LEAGUE, "Premier League")}
                    className="text-xl font-bold border bg-blue-400 rounded-xl"
                >
                    Premier League
                </button>
                <button
                    onClick={() => seleccionarLiga(SERIE_A, "Serie A")}
                    className="text-xl font-bold border bg-blue-400 rounded-xl"
                >
                    Serie A
                </button>
                <h2 className="text-2xl font-bold mt-6">Tabla de puntajes</h2>
                <div className="w-full max-w-md flex flex-col bg-blue-400 text-black p-4 rounded-xl mt-3">
                    {tabla.length === 0 && <p>No hay puntajes aún</p>}
                    {tabla.map((t, i) => (
                        <p key={i} className="border-b py-1 font-bold ">
                            <b>{t.liga}</b>: {t.puntos} pts — <i>{t.fecha}</i>
                        </p>
                    ))}
                    <button onClick={eliminarHistorial} className="rounded-xl p-1 items-center text-center border bg-sky-500">Eliminar historial</button>
                
                </div>

            </div>
        </div>
    );
}
