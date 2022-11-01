import {OAuthCredential, UserCredential} from "firebase/auth";
import {BehaviorSubject} from "rxjs";


export const sessionSubject = new BehaviorSubject<UserCredential | null>(null);
export const authSubject = new BehaviorSubject<OAuthCredential | null>(null);