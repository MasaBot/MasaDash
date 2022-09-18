import { startServer, stopServer } from "../utils/serverControl";
import ServerStatusIndicator from "./SeverStatusIndicator";

import styles from "./css/StatusControl.module.css";
import { useState, useEffect } from "react";
import { ServerStatus, subscribeToServerStatus, unSubscribeFromServerStatus } from "../utils/serverStatus";

export default function StatusControl(props: { tag: string }) {

  const [serverStatus, setServerStatus] = useState(ServerStatus.Unknown);

  useEffect(() => {
    function handleStatusChange(status: ServerStatus) {
      setServerStatus(status);
    }
    subscribeToServerStatus(props.tag, handleStatusChange);
    return function cleanup() {
      unSubscribeFromServerStatus(props.tag, handleStatusChange);
    };
  }, []);


  return (
    <div className={styles.container}>
      <ServerStatusIndicator server={props.tag} />
      <button onClick={() => {
        setServerStatus(ServerStatus.Unknown);
        startServer(props.tag);
      }} disabled={
        serverStatus === ServerStatus.Online || serverStatus === ServerStatus.Unknown
      }>Start</button>
      <button onClick={async() => {
        setServerStatus(ServerStatus.Unknown);
        await stopServer(props.tag);
      }} disabled={
        serverStatus === ServerStatus.Offline || serverStatus === ServerStatus.Unknown
      }>Stop</button>
      <button disabled={serverStatus === ServerStatus.Unknown}>Restart</button>
    </div>
  )
}