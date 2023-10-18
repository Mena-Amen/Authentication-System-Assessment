import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  UserCredential,
  Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";

import auth from "../firebase";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface AuthContextModel {
  auth: Auth;
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  signin: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext({} as AuthContextModel);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // To Signup For The 1st Time
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // To to Log In As An Existing User
  function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    // Calling Method From Firebase To Know If User Has Been Changed or Not
    const unsubsrcibe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubsrcibe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signup, currentUser, auth, signin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
