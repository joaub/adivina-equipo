

export default function Juego({

    equipoActual,
    respuesta,
    setRespuesta,
    mensaje,
    verificar,
    siguiente,
    completado,
    reiniciar,
    vidas,
    perdiste,
    puntos,
    racha,
    opciones,
    pistaUsada,
    generarPista,
    tiempo
}) {



    return (
        <div className="w-full max-w-md bg-black/40 backdrop-blur p-6 rounded-xl text-center flex flex-col gap-4">
            <div className="flex justify-between text-sm opacity-80">
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
                ${mensaje === "correcto" ? "" : "blur-sm"}`}

            />

            
            <input
                type="text"
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                placeholder="Escribí el equipo"
                className="w-full px-4 py-2 rounded bg-black/50 text-white text-center outline-none"
                disabled={perdiste || completado}
            />
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

            {/* BOTONES PRINCIPALES */}
            <div className="flex gap-2">
                <button
                    onClick={verificar}
                    className="flex-1 py-2 rounded bg-green-600 hover:bg-green-700"
                >
                    Verificar
                </button>
            {vidas > 0 && vidas < 2 && ( 
                <button
                    onClick={generarPista}
                    disabled={pistaUsada }
                    
                    className={`flex-1 py-2 rounded ${pistaUsada
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    🧠 Pista
                </button>
                )}
            </div>

            {/* 🔑 PISTA POR OPCIONES */}
            {opciones.length > 0 && vidas > 0 && mensaje !== "correcto" && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                    {opciones.map((op, i) => (
                        <button
                            key={i}
                            onClick={() => setRespuesta(op.nombre)}
                            className="py-2 rounded bg-white/10 hover:bg-white/20 text-sm"
                        >
                            {op.nombre}
                        </button>
                    ))}
                </div>
            )}

            {/* FOOTER */}
            <div className="flex justify-between text-sm opacity-80 mt-2">
                <span>⭐ {puntos}</span>

                {(mensaje === "correcto" ) && (
                    <button
                        onClick={siguiente}
                        className="underline"
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
