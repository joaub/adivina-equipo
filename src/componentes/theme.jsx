import { useEffect } from "react";



const ThemeSelector = () => {
    const themes = {
        azul: {
            bg: "#3f79ffff",

            text: "#f8fafc",

        },
        verde: {
            bg: "#16c05dff",

            text: "#ecfdf5",

        },
        rojo: {
            bg: "#960f0fff",

            text: "#fef2f2",

        },
        boca: {
            bg: "linear-gradient(to bottom, #0b1c3d 0%, #0b1c3d 30%, #facc15 30%, #facc15 70%, #0b1c3d 70%, #0b1c3d 100%)",
            text: "#f7f8faff",
        },
        river: {
            bg: "linear-gradient(135deg, #ffffff 0%, #ffffff 40%, #dc2626 40%, #dc2626 60%, #ffffff 60%, #ffffff 100%)",
            text: "#000",
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
                    className="px-3 py-1 rounded text-sm border border-white/30"
                    style={{ background: theme.bg }}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default ThemeSelector;
