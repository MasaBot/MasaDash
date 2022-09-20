import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./css/settings.module.css";

const themes = {
    DARK_AS_DEFAULT: {
        "--background-dark": "#030618",
        "--background-light": "#060a1f",
        "--text-color": "white",
        "--highlight": "#Bc1930",
        "--highlight-dark": "#991627",
        "--function-disabled-bg": "#464646",
        "--function-disabled-fg": "#d3d3d3"
    },
    DREAMING: {
        "--background-dark": "#a2d2ff",
        "--background-light": "red",
        "--text-color": "#393D3F",
        "--highlight": "#ffc8dd",
        "--highlight-dark": "#ffafcc",
        "--function-disabled-bg": "#c2c2c2",
        "--function-disabled-fg": "#212121"
    },
    CAMO: {
        "--background-dark": "black",
        "--background-light": "#0e0e0e",
        "--text-color": "white",
        "--highlight": "#001703",
        "--highlight-dark": "#000b01",
        "--function-disabled-bg": "#464646",
        "--function-disabled-fg": "#d3d3d3"
    }
}

export default function SettingsPage() {

    const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>("DARK_AS_DEFAULT");

    const navigate = useNavigate();

    function themeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTheme(e.target.value as keyof typeof themes);
    }
    function isChecked(value: string) {
        return value === currentTheme;
    }

    return (
        <div className={styles.container}>
            <h1>Themes</h1>
            <form className={styles.themes} onSubmit={e => {
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
                <div className={styles.themesBox}>
                    {
                        Object.entries(themes).map(([key, value]) => {
                            return (
                                <>
                                    <div className={styles.radioContainer}>
                                        <div className={styles.colorContainer} style={{
                                            borderTopColor: value["--background-light"],
                                            borderLeftColor: value["--background-light"],
                                            borderBottomColor: value["--background-dark"],
                                            borderRightColor: value["--background-dark"],
                                            backgroundColor: value["--highlight"]
                                        }}>
                                            <span className={styles.checkedIndicator + " material-symbols-outlined"}>{isChecked(key) ? "check" : ""}</span>
                                        </div>
                                        <input key={key} type="radio" value={key} onChange={themeChange} checked={isChecked(key)} />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <button type="submit" style={{width: 100}}>Save</button>
            </form>
        </div>
    );
}