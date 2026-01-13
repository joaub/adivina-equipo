import { useEffect } from "react";



const ThemeSelector = () => {
    const themes = {
        azul: {
            bg: "#0f172a",
            
            text: "#f8fafc",
            
        },
        verde: {
            bg: "#052e16",
            
            text: "#ecfdf5",
            
        },
        rojo: {
            bg: "#450a0a",
            
            text: "#fef2f2",
            
        },
        boca: { // 😏 guiño futbolero
            bg: "#0b1c3d",
            
            text: "#facc15",
            
        },
    };

    const setTheme = (theme) => {
        const root = document.documentElement;

        root.style.setProperty("--color-bg", theme.bg);
    
        root.style.setProperty("--color-text", theme.text);
        
        localStorage.setItem("theme", JSON.stringify(theme));
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(JSON.parse(savedTheme));
        }
    }, []);

    return (
        <div className="flex gap-2">
            {Object.entries(themes).map(([name, theme]) => (
                <button
                    key={name}
                    onClick={() => setTheme(theme)}
                    className="px-3 py-1 rounded text-white"
                    style={{ backgroundColor: theme.bg }}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default ThemeSelector;
