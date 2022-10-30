import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseApp = initializeApp(require('../env/firebase'));
export const googleAnalytics = getAnalytics(firebaseApp);