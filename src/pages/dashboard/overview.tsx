import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { LoadingText } from "../../components/LoadingIndicator";
import StatusControl from "../../components/StatusControl";
import ValueTile from "../../components/ValueTile";
import changeServerName from "../../utils/changeServerName";
import { fetchServer, ServerMeta } from "../../utils/fetchServer";

import styles from "../css/overview.module.css";
import DashboardLayout from "./Layout";

export default function DashboardOverviewPage() {

    const [serverMeta, setServerMeta] = useState<ServerMeta | null>(null)
    const [serverName, setServerName] = useState<string | null>(null);
    const [isNameEditable, setNameEditable] = useState(false);

    const nameInputRef = useRef<HTMLInputElement>(null);

    const { tag } = useParams() as { tag: string };

    useEffect(() => {
        fetchServer(tag).then(meta => {
            setServerMeta(meta);
            setServerName(meta.name);
        });
    }, [tag]);

    useEffect(() => {
        if (isNameEditable) {
            nameInputRef.current?.focus();
        }
    });

    return (
        <DashboardLayout pageName={"Overview"}>
            <form onSubmit={async e => {
                e.preventDefault()
                if (!serverName) return;
                try {
                    await changeServerName(tag, serverName);
                    setServerMeta(oldMeta => {
                        if (oldMeta) {
                            return {...oldMeta, name: serverName}
                        }
                        return null;
                    });
                    setNameEditable(false);
                } catch (err) {}
            }}>
                <div className={styles.serverTitleContainer}>
                    <button disabled={!serverName} type="button" className="material-symbols-outlined" onClick={e => setNameEditable(!isNameEditable)}>
                        edit
                    </button>
                    {
                        serverName ? <input
                            disabled={!isNameEditable}
                            ref={nameInputRef}
                            className={styles.headerInput}
                            value={serverName ?? "dsfdsdsf"}
                            onChange={e => setServerName(e.target.value)}
                            maxLength={20}
                        /> : <h1><LoadingText/></h1>
                    }
                </div>
                <div className={styles.editSaveCancel} style={{
                    display: !isNameEditable ? "none" : "flex"
                }}>
                    <button type="reset" className={styles.editCancel} onClick={() => {
                        setServerName(serverMeta?.name || "");
                        setNameEditable(false);
                    }}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
            <StatusControl tag={tag} />
            <div className={styles.tiles}>
                <ValueTile valueName={"Processor"} value={"56%"} percentage={0.56} />
                <ValueTile valueName={"Memory"} value={"79%"} percentage={0.79} />
                <ValueTile valueName={"Players"} value={"4/20"} percentage={4 / 20} />
            </div>
        </DashboardLayout>
    )
}