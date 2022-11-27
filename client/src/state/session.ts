import { getAuth, OAuthCredential, UserCredential } from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { AppUser } from "../entities/app-user";
import { firebaseApp } from "./firebase";

export const userSubject = new BehaviorSubject<AppUser | null>(null);
export const auth = getAuth(firebaseApp);
