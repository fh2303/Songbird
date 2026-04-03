import { socket } from "../socket.js";

export function ConnectionManager() {
  return (
    <>
      <button onClick={() => socket.connect()}>Connect</button>
      <button onClick={() => socket.disconnect()}>Disconnect</button>
    </>
  );
}
