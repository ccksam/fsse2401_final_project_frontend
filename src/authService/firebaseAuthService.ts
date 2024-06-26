import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./firebaseConfig.ts";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup, signOut,
    User
} from "firebase/auth";


export const serviceInit = () => {

    // Your web app's Firebase configuration
    // Initialize Firebase
    initializeApp(firebaseConfig);
}

// https://firebase.google.com/docs/auth/web/start#sign_in_existing_users
export const handleSignInWithEmailAndPassword = async (email: string, password: string): Promise<boolean> => {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        // Sign in success
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// https://firebase.google.com/docs/auth/web/google-signin#before_you_begin
export const handleSignInWithGoogle = async (): Promise<boolean> => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        await signInWithPopup(auth, provider);
        // Sign in success
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
export const handleOnAuthStateChanged = (callback: (user: User | null) => void) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        // let loginUser: UserData | null;
        // if (user) {
        //     // User is signed in, see docs for a list of available properties
        //     // https://firebase.google.com/docs/reference/js/firebase.User
        //     loginUser = {
        //         email: user.email || "Login User"
        //     }
        // } else {
        //     // User is signed out
        //     loginUser = null;
        // }
        callback(user);
    });
};

export const getAccessToken = (): Promise<string> | null => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
        return null;
    }
// same as state loginUser.getIdToken
    return currentUser.getIdToken(false);
}

export const handleSignOut = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
    } catch (error) {
        console.warn(error);
    }
}
