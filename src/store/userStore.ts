"use client";

import { create } from "zustand";

interface UserInterface {
  id: string;
  email: string;
  username: string;
  name: string;
}

type UserType = {
  user: UserInterface | null;
  updateUser: (newUser: UserInterface | null) => void;
};

const userStore = create<UserType>((set) => ({
  user: null,
  updateUser: (newUser: UserInterface | null) => (set(() => ({ user: newUser })))
}));

export default userStore;
