import { create } from "zustand";

interface WebSocketStore {
    ws: WebSocket | null;
    initializeWebSocket: (url: string) => void;
}


const useWebSocketStore = create<WebSocketStore>((set) => ({
    ws: null,
    initializeWebSocket: (url: string) => {
        if (!url) {
            console.log("INVALID URL...")
            return;
        }

        const ws = new WebSocket(url);

        ws.onopen = () => {
            set({ws});
        }

        ws.onclose =  () => {
            set({ws: null})
        }

        ws.onerror = (error) => {
            console.log("ws error :", error);
        }
    }
}))

export default useWebSocketStore;