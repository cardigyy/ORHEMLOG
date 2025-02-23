"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "./firebase-client";

const AuthContext = createContext<{
  loading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}>({
  loading: true,
  user: null,
  signIn: async () => {
    throw new Error("signIn function is not implemented");
  },
  logout: async () => {
    throw new Error("logout function is not implemented");
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (signedUser) => {
      setUser(signedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ loading, user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
