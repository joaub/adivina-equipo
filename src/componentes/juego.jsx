export default function Juego({
    darkMode,
    equipoActual,
    respuesta,
    setRespuesta,
    mensaje,
    verificar,
    siguiente,
    completado,
    reiniciar,
    vidas,
    perdiste
}) {

    return (
        <div className="text-center">

            <img
                src={equipoActual.img}
                className={`w-50 h-50 rounded-xl m-4 bg-white mx-auto block 
                ${vidas > 1 ? "blur-sm" : ""} `}
            />

            <p className="text-3xl text-center mt-4 p-2">
                {equipoActual.nombre
                    .split("")
                    .map(c => (c === " " ? "\u00A0\u00A0" : "_ "))
                    .join(" ")}
            </p>
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
                    className={`w-72 rounded-xl border text-center 
            ${darkMode ? "bg-gray-600 text-white" : "bg-white text-black"}`}
                />

                <button
                    onClick={verificar}
                    className="px-10 border ml-4 rounded-xl bg-blue-500"
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

            {mensaje !== "respuesta vacia" && mensaje !== "" && mensaje !== "incorrecto" && (
                <button onClick={siguiente} 
                className="px-6 py-2 border rounded-lg mt-4">
                    Siguiente
                </button>
            )}
            {completado && (
                <div className="text-center mt-10">
                    <p className="text-3xl font-bold text-green-400">
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
