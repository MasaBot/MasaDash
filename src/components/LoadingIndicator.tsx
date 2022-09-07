import styles from "./css/LoadingIndicator.module.css";

export default function LoadingIndicator() {
    return (
      <div className={styles.container}>
        <div style={{animationDelay: "0ms"}}></div>
        <div style={{animationDelay: "150ms"}}></div>
        <div style={{animationDelay: "300ms"}}></div>
      </div>
    )
}