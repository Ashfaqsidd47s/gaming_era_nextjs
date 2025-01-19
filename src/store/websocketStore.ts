import { create } from "zustand";

interface WebSocketStore {
    ws: WebSocket | null;
    initializeWebSocket: (newWs: WebSocket) => void;
}


const useWebSocketStore = create<WebSocketStore>((set) => ({
    ws: null,
    initializeWebSocket: (newWebsocket: WebSocket) => {set({ws: newWebsocket})}
}))

export default useWebSocketStore;