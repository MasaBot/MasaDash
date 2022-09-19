import styles from "./css/IconButton.module.css";


export default function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: string }) {
    return (
        <button
            {...props}
            className={`${styles.iconButton} material-symbols-outlined ${props.className || ""}`.trim()}
        >
            {props.icon}
        </button>
    )
}