import { socket } from "./connectWS";

export enum ServerStatus {
  Online = "online",
  Offline = "offline",
  Unknown = "unknown"
}

type SubscriptionUpdateFunction = (status: ServerStatus) => void;

function serverStatusListener(event: MessageEvent, server: string, update: SubscriptionUpdateFunction) {
  const data = JSON.parse(event.data);
  if (data.eventType === "serverReady" && data.server === server) {
      update(ServerStatus.Online)
  } else if (data.eventType === "serverClose" && data.server === server) {
      update(ServerStatus.Offline)
  }
}

export function subscribeToServerStatus(server: string, update: SubscriptionUpdateFunction) {
  fetch(`http://localhost:3000/api/v1/server/${server}`, {
    method: "get"
  }).then(res => res.json()).then(data => update(data.status as ServerStatus));

  socket.addEventListener("message", event => serverStatusListener(event, server, update));
}
export function unSubscribeFromServerStatus(server: string, update: SubscriptionUpdateFunction) {
  socket.removeEventListener("message", event => serverStatusListener(event, server, update));
}