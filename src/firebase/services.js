import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as signOutFirebase,
    deleteUser
} from "firebase/auth";

import {
    collection,
    addDoc,
    getFirestore,
    query,
    where,
    getDocs,
    Timestamp
}from "firebase/firestore"; 


export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return await signInWithPopup(auth, provider)
}

export async function signOut() {
    const auth = getAuth();
    return await signOutFirebase(auth);
}

export async function deleteAccount() {
    const auth = getAuth();
    const user = auth.currentUser;
    return await deleteUser(user);
}

export async function addNote(title, description, userId) {
    const timestamp = Timestamp.now();
    return addDoc(collection(getFirestore(), import.meta.env.VITE_FIREBASE_NOTES_COLLECTION_NAME), { title, description, userId, timestamp });
}