export async function sendCommand(command: string, server: string) {
  await fetch(`http://localhost:3000/api/v1/server/${server}/send-command`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command })
  });
}