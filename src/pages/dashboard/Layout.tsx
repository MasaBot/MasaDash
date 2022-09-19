import { Link, useParams } from "react-router-dom";
import IconButton from "../../components/IconButton";
import styles from "../css/Layout.module.css";

export default function DashboardLayout(props: {children: React.ReactNode, pageName: string}) {

  const { tag } = useParams() as { tag: string };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <img src={`${process.env.PUBLIC_URL + "/assets/masa_logo_white.svg"}`} alt="Masa Logo" width={200} />
        <ul className={styles.sidebarButtons}>
          <li><Link to={`/dashboard/overview/${tag}`}><button>Overview</button></Link></li>
          <li><Link to={`/dashboard/console/${tag}`}><button>Console</button></Link></li>
          <li><Link to={`/dashboard/files/${tag}`}><button>Files</button></Link></li>
        </ul>
      </div>
      <div className={styles.page}>
        <h2 className={styles.pageTitle}>{props.pageName}</h2>
        {props.children}
        {/* <div className={styles.content}>
          
        </div> */}
      </div>
      <footer className={styles.footer}>
        <span className={styles.footerServerTag}>{tag}</span>
        <a href="https://github.com/MasaBot/" target="_blank" rel="noreferrer">Masa Open Source</a>
        <span className={styles.footerVersion}>0.0.1</span>
      </footer>

      <div className={styles.topRight}>
        <Link to="/settings"><IconButton icon="settings"/></Link>
        <span className={styles.beta}>beta</span>
      </div>
    </div>
  )
}