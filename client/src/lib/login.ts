import {browserSessionPersistence, getAuth, setPersistence, signInWithPopup, UserCredential} from "firebase/auth";
import {firebaseApp} from "../state/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {authSubject, sessionSubject, userSubject} from "../state/session";
import {AppUser} from "../entities/app-user";


export async function authWithGoogle(): Promise<AppUser | null>{
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
    userSubject.next(credential && await getAppUser(credential));
    return userSubject.getValue();
}

export async function logOut() {
    sessionSubject.next(null);
    authSubject.next(null);
    userSubject.next(null);
}

async function getAppUser({user}: UserCredential): Promise<AppUser>{
    const response = await fetch(`/api/user`, {
        method: 'POST',
        body: JSON.stringify({uid: user.uid, name: user.displayName}),
        headers: {"Content-Type": "application/json"}
    });
    return response.status === 200 ? response.json() : null;

}