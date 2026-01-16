import { useEffect, useState } from "react";

const presetThemes = {
    boca: {
        bg: "linear-gradient(to bottom, #0b1c3d 0%, #0b1c3d 30%, #facc15 30%, #facc15 70%, #0b1c3d 70%, #0b1c3d 100%)",
        text: "#facc15",
    },
    river: {
        bg: "linear-gradient(135deg, #ffffff 0%, #ffffff 40%, #dc2626 40%, #dc2626 60%, #ffffff 60%, #ffffff 100%)",
        text: "#991b1b",
    },
    purpura: {
        bg: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a855f7 100%)",
        text: "#e9d5ff",
    },
    azul: {
        bg: "linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #38bdf8 100%)",
        text: "#e0f2fe",
    },
};

const ThemeSelector = () => {
    const [open, setOpen] = useState(false);
    const [customOpen, setCustomOpen] = useState(false);

    const [cantidad, setCantidad] = useState(1); // 1 | 2 | 3
    const [direccion, setDireccion] = useState("vertical"); // vertical | horizontal | diagonal
    const [colors, setColors] = useState(["#0f172a", "#22c55e", "#9333ea"]);

    /* ======================
       APLICAR TEMA (SIN GUARDAR)
    ======================= */
    const applyTheme = (theme) => {
        document.documentElement.style.setProperty("--color-bg", theme.bg);
        document.documentElement.style.setProperty("--color-text", theme.text);
    };

    /* ======================
       SET TEMA + GUARDAR
    ======================= */
    const setTheme = (theme) => {
        applyTheme(theme);
        localStorage.setItem("theme", JSON.stringify(theme));
        setOpen(false);
        setCustomOpen(false);
    };

    /* ======================
       CARGAR TEMA GUARDADO
    ======================= */
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);
            if (parsed.bg && parsed.text) {
                applyTheme(parsed);
            }
        } catch {
            localStorage.removeItem("theme");
        }
    }, []);

    /* ======================
       CONSTRUIR GRADIENTE
    ======================= */
    const buildBackground = () => {
        if (cantidad === 1) {
            return colors[0];
        }

        let dir = "to bottom";
        if (direccion === "horizontal") dir = "to right";
        if (direccion === "diagonal") dir = "to bottom right";

        if (cantidad === 2) {
            return `linear-gradient(${dir},
        ${colors[0]} 0%, ${colors[0]} 50%,
        ${colors[1]} 50%, ${colors[1]} 100%)`;
        }

        return `linear-gradient(${dir},
      ${colors[0]} 0%, ${colors[0]} 33%,
      ${colors[1]} 33%, ${colors[1]} 66%,
      ${colors[2]} 66%, ${colors[2]} 100%)`;
    };

    const guardarTema = () => {
        setTheme({
            bg: buildBackground(),
            text: "#ffffff",
        });
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded bg-black/60 text-white border border-white/30"
            >
                🎨 Temas
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-black/90 p-3 rounded flex flex-col gap-3 z-50">

                    {/* PRESETS */}
                    {Object.entries(presetThemes).map(([name, theme]) => (
                        <button
                            key={name}
                            onClick={() => setTheme(theme)}
                            className="p-2 rounded text-white text-sm border border-white/20"
                            style={{ background: theme.bg }}
                        >
                            {name.toUpperCase()}
                        </button>
                    ))}

                    <hr className="border-white/20" />

                    <button
                        onClick={() => setCustomOpen(!customOpen)}
                        className="text-sm underline text-white"
                    >
                        ➕ Crear mi tema
                    </button>

                    {customOpen && (
                        <>
                            {/* CANTIDAD */}
                            <div className="flex gap-2">
                                {[1, 2, 3].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setCantidad(n)}
                                        className={`flex-1 py-1 rounded text-sm ${cantidad === n
                                                ? "bg-white text-black"
                                                : "bg-white/10 text-white"
                                            }`}
                                    >
                                        {n} color{n > 1 && "es"}
                                    </button>
                                ))}
                            </div>

                            {/* DIRECCIÓN */}
                            {cantidad > 1 && (
                                <div className="flex gap-2">
                                    {["vertical", "horizontal", "diagonal"].map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setDireccion(d)}
                                            className={`flex-1 py-1 rounded text-sm ${direccion === d
                                                    ? "bg-white text-black"
                                                    : "bg-white/10 text-white"
                                                }`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* COLORES */}
                            {[...Array(cantidad)].map((_, i) => (
                                <input
                                    key={i}
                                    type="color"
                                    value={colors[i]}
                                    onChange={(e) => {
                                        const copy = [...colors];
                                        copy[i] = e.target.value;
                                        setColors(copy);
                                    }}
                                    className="w-full h-8 rounded"
                                />
                            ))}

                            <button
                                onClick={guardarTema}
                                className="mt-2 px-3 py-2 rounded bg-white text-black text-sm"
                            >
                                Guardar tema
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
