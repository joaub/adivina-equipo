

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
    pista,
    generarPista,
    pistaUsada,
    tiempo
}) {



    return (
        <div className="text-center">
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

                    const letra = c.toUpperCase();

                    // Si la pista coincide → mostrarla en amarillo
                    if (generarPista && letra === pista) {
                        return (
                            <span key={i} className="text-yellow-400 font-extrabold">
                                {letra}&nbsp;
                            </span>
                        );
                    }

                    return <span key={i}>_ </span>;
                })}
            </p>
            {vidas === 1 && !pistaUsada && (
                <button
                    onClick={generarPista}
                    className="px-6 py-2 bg-purple-600 text-white rounded-xl mt-3"
                >
                    Usar pista
                </button>
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
