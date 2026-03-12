

function Dificultad({ setDificultad }) {

    return (
        <div className="flex flex-col gap-3 text-center">

            <h2 className="text-3xl m-3 p-2 font-bold">Elegir dificultad</h2>

            <button
                onClick={() => setDificultad("facil")}
                className="bg-green-600  p-4  rounded text-xl "
            >
                Fácil
            </button>

            <button
                onClick={() => setDificultad("normal")}
                className="bg-yellow-600 p-4  rounded text-xl "
            >
                Normal
            </button>

            <button
                onClick={() => setDificultad("dificil")}
                className="bg-red-600 p-4  rounded text-xl "
            >
                Difícil
            </button>

        </div>
    )
}
export default Dificultad;