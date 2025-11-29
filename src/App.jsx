import { useState } from 'react'


function App() {
const [darkMode, setDarkMode] = useState(false)
  
return (
    <>
      <div className={`absolute inset-0  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            } `}>
        <div>adivina el equipo </div>
        <button onClick={() => setDarkMode(!darkMode)} className={`px-2 ${darkMode ? "bg-dark" : "bg-white" }`}  >
          modo {darkMode ? 'oscuro' : 'claro'}
        </button>
      </div>
      
    </>
  )
}

export default App
