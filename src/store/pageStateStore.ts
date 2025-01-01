import { create } from "zustand";

type PageRouteType = {
    pageRoute: string;
    updatePageRoute: (newRoute:string) => void;
};

export const pageStateStore = create<PageRouteType>((set) => ({
    pageRoute: "feeds",
    updatePageRoute: (newRoute:string) => (set(() => ({ pageRoute: newRoute })))
}));


  