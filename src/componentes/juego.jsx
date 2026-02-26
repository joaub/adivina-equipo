

export default function Juego({

    equipoActual,
    mensaje,

    siguiente,
    completado,
    reiniciar,
    vidas,
    perdiste,
    puntos,
    racha,
    opciones,
    tiempo,
    elegirOpciones,
    opcionSeleccionada
}) {



    return (
        <div className="w-full max-w-md bg-black/40 backdrop-blur p-6 rounded-xl text-center flex flex-col gap-4 ">
            <div className="flex justify-between text-sm opacity-80 ">

                <p className={`text-xl font-bold mb-2 
                ${tiempo <= 5 ? "text-red-400 animate-pulse" : ""}`}>
                    ⏱️ Tiempo: {tiempo}s
                </p>
                <p className="text-xl font-bold mt-2">
                    ⭐ Puntos: {puntos}
                </p>
                <p className="text-lg mt-1">🔥 Racha: {racha}</p>
            </div>
            <img
                src={equipoActual.img}

                className={`w-50 h-50 rounded-xl m-4 bg-white mx-auto block 
                ${mensaje === "correcto" || perdiste ? "blur-0" : "blur-sm"}`}

            />


            {/* OPCIONES */}
            <div className="grid grid-cols-2 gap-2">
                {opciones.map((op, i) => {
                    let estilo = "bg-white/10 hover:bg-white/20";

                    // Cuando gana
                    if (mensaje === "correcto") {
                        if (op.nombre === equipoActual.nombre) {
                            estilo = "bg-green-600";
                        }
                    }
                    if (mensaje === "incorrecto") {
                        if (op.nombre === opcionSeleccionada) {
                            estilo = "bg-red-600 transition-none";
                        }
                    }

                    // Cuando pierde todas las vidas
                    if (perdiste) {
                        if (op.nombre === equipoActual.nombre) {
                            estilo = "bg-green-600 animate-pulse ";
                        
                        }
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => elegirOpciones(op)}
                            disabled={perdiste || completado}
                            className={`py-2 rounded text-sm transition ${estilo}`}
                        >
                            {op.nombre}
                        </button>
                    );
                })}
            </div>


            <p className="text-xl font-bold mb-4">
                ❤️ Vidas: {vidas}
            </p>

            {/* MENSAJE */}
            {mensaje && (
                <p
                    className={`text-sm ${mensaje === "correcto" ? "text-green-400" : "text-red-400"
                        }`}
                >
                    {mensaje}
                </p>
            )}



            {/* FOOTER */}
            <div className="flex justify-between text-sm opacity-80 mt-2">
                <span>⭐ {puntos}</span>

                {(mensaje === "correcto") && (
                    <button
                        onClick={siguiente}
                        className="underline"
                        disabled={perdiste || completado}
                    >
                        Siguiente →
                    </button>
                )}
            </div>

            {/* FIN */}
            {completado && (
                <div className="mt-4">
                    <p className="mb-2">🎉 Liga completada</p>
                    <button
                        onClick={reiniciar}
                        className="px-4 py-2 rounded bg-white text-black"
                    >
                        Reiniciar
                    </button>
                </div>
            )}

            {perdiste && (
                <div className="mt-4">
                    <p className="mb-2">💀 Perdiste</p>
                    <button
                        onClick={reiniciar}
                        className="px-4 py-2 rounded bg-white text-black"
                    >
                        Intentar otra vez
                    </button>
                </div>
            )}
        </div>
    );
};
