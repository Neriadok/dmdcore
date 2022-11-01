import {OAuthCredential, UserCredential} from "firebase/auth";
import {BehaviorSubject} from "rxjs";
import {AppUser} from "../entities/app-user";


export const sessionSubject = new BehaviorSubject<UserCredential | null>(null);
export const authSubject = new BehaviorSubject<OAuthCredential | null>(null);
export const userSubject = new BehaviorSubject<AppUser | null>(null);