export default function LigaSelector({ darkMode, setDarkMode, seleccionarLiga, LIGA_ARGENTINA, LIGA_ESPAÑOLA }) {

    return (
        <div>
            <h1 className="text-3xl font-bold p-4">Adivina el equipo por el escudo</h1>

            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-2 absolute top-5 right-60 border ${darkMode ? "bg-dark" : "bg-white"}`}
            >
                modo {darkMode ? "oscuro" : "claro"}
            </button>

            <div className="p-2 m-3 flex flex-col gap-3">
                <button
                    onClick={() => seleccionarLiga(LIGA_ARGENTINA)}
                    className="text-xl font-bold border bg-blue-400 rounded-xl"
                >
                    Liga Argentina
                </button>

                <button
                    onClick={() => seleccionarLiga(LIGA_ESPAÑOLA)}
                    className="text-xl font-bold border bg-blue-400 rounded-xl"
                >
                    LaLiga España
                </button>
            </div>
        </div>
    );
}
