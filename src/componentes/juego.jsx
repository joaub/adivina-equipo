export default function Juego({
    darkMode,
    equipoActual,
    respuesta,
    setRespuesta,
    mensaje,
    verificar,
    siguiente,
}) {

    return (
        <div className="text-center">

            <img
                src={equipoActual.img}
                className="w-50 h-50 rounded-xl blur-sm m-4 bg-white"
            />

            <p className="text-3xl text-center mt-4 p-2">
                {equipoActual.nombre
                    .split("")
                    .map(c => (c === " " ? "\u00A0\u00A0" : "_ "))
                    .join(" ")}
            </p>

            <div className="p-5 mt-7">
                <input
                    value={respuesta}
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
                <button onClick={siguiente} className="px-6 py-2 border rounded-lg mt-4">
                    Siguiente
                </button>
            )}
        </div>
    );
}
