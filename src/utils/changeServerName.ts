export default async function changeServerName(server: string, newName: string) {
  await fetch(`http://localhost:3000/api/v1/server/${server}/change-name`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newName })
  })
}