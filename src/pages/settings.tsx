import { useState } from "react";

const themes = {
    DARK: {
        "--background-dark": "#030618",
        "--background-light": "#060a1f",
        "--text-color": "white",
        "--highlight": "#Bc1930",
        "--highlight-dark": "#991627"
    },
    GREY: {
        "--background-dark": "#1d1d1d",
        "--background-light": "#525252",
        "--text-color": "white",
        "--highlight": "#242424",
        "--highlight-dark": "#000"
    },
}

export default function SettingsPage() {

    const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>("DARK");

    function themeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTheme(e.target.value as keyof typeof themes);
    }
    function isChecked(value: string) {
        return value === currentTheme;
    }

    return (
        <form onSubmit={e => {
            e.preventDefault()
            const root = document.querySelector(":root") as HTMLHtmlElement;
            const theme = themes[currentTheme];

            for (const property in theme) {
                if (Object.prototype.hasOwnProperty.call(theme, property)) {
                    if (!property.startsWith("--")) continue;
                    const color = theme[property as keyof typeof theme];

                    root.style.setProperty(property, color);
                }
            }
        }}>
            {
                Object.entries(themes).map(([key, value]) => {
                    return <input key={key} type="radio" value={key} onChange={themeChange} checked={isChecked(key)} />
                })
            }
            <button type="submit">Save</button>
        </form>
    );
}