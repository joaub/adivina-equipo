

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
            <p className={`text-xl font-bold mb-2 
                ${tiempo <= 5 ? "text-red-400 animate-pulse" : ""}`}>
                ⏱️ Tiempo: {tiempo}s
            </p>
            <img
                src={equipoActual.img}

                className={`w-50 h-50 rounded-xl m-4 bg-white mx-auto block 
                ${mensaje === "correcto" ? "" : vidas > 1 ? "blur-sm" : ""}`}

            />
            <p className="text-xl font-bold mt-2">
                ⭐ Puntos: {puntos}
            </p>
            <p className="text-lg mt-1">🔥 Racha: {racha}</p>

            <p className="text-3xl text-center mt-4 p-2">
                {equipoActual.nombre.split("").map((c, i) => {
                    if (c === " ") return <span key={i}>&nbsp;&nbsp;</span>;
                    

                    return <span key={i}>_ </span>;
                })}
            </p>
            {vidas === 1 && opciones.length > 0 && !pistaUsada && (
                
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {opciones.map((op, i) => (
                                <button
                                    key={i}
                                    onClick={() => setRespuesta(op.nombre)}
                                    className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm"
                                >
                                    {op.nombre}
                                </button>
                            ))}
                        </div>
                    
                
            )}
            {/* Mostrar cantidad de letras */}
            <p className="text-xl text-center mt-4 tracking-widest font-bold">
                {equipoActual.nombre.replace(/\s/g, "").replace(/[^a-zA-Z]/g, "").length} letras
            </p>
            <p className="text-xl font-bold mb-4">
                ❤️ Vidas: {vidas}
            </p>


            <div className="p-5 mt-7">
                <input
                    value={respuesta}
                    onKeyDown={(e) => e.key === "Enter" && verificar()}
                    onChange={(e) => setRespuesta(e.target.value)}
                    placeholder="Escribe el nombre del equipo..."
                    className={`w-72 rounded-xl border text-center `}
                />

                <button
                    onClick={verificar}
                    className="px-10 border ml-4 rounded-xl bg-blue-500"
                >
                    Verificar
                </button>
            </div>

            {mensaje === "correcto" && (
                <div>
                    <p className="text-green-600 text-xl font-semibold">¡Correcto! 🎉</p>
                </div>
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

            {mensaje !== "respuesta vacia" && mensaje !== "" && mensaje !== "incorrecto" && (
                <button onClick={siguiente}
                    className="px-6 py-2 border rounded-lg mt-4 bg-cyan-500 font-bold">
                    Siguiente
                </button>
            )}
            {completado && (
                <div className="text-center mt-10">
                    <p className="text-3xl font-bold text-green-500">
                        ¡Liga completada! 🎉
                    </p>

                    <button
                        onClick={reiniciar}
                        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl"
                    >
                        Volver al menú
                    </button>
                </div>
            )}
            {perdiste && (
                <div className="text-center mt-10">
                    <p className="text-3xl font-bold text-red-400">
                        ¡Has perdido! 😢
                    </p>

                    <button
                        onClick={reiniciar}
                        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl"
                    >
                        Volver al menú
                    </button>
                </div>
            )}
        </div>
    );
}
