import {browserSessionPersistence, getAuth, setPersistence, signInWithPopup, UserCredential} from "firebase/auth";
import {firebaseApp} from "../state/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {authSubject, sessionSubject} from "../state/session";


export async function authWithGoogle(): Promise<UserCredential | null>{
    const provider = new GoogleAuthProvider();
    let oauth, credential = null;
    try {
        const auth = getAuth(firebaseApp);
        await setPersistence(auth, browserSessionPersistence) // Remove for sensitive Data applications
        credential = await signInWithPopup(auth, provider);
        oauth = GoogleAuthProvider.credentialFromResult(credential);
    } catch (error: any) {
        console.warn(error);
        oauth = GoogleAuthProvider.credentialFromError(error);
    }
    sessionSubject.next(credential);
    authSubject.next(oauth || null);
    return sessionSubject.getValue();
}