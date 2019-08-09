import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAAXLW0AvGPfp07VQadRW-916cZubLlRv8",
    authDomain: "crwn-db-975b5.firebaseapp.com",
    databaseURL: "https://crwn-db-975b5.firebaseio.com",
    projectId: "crwn-db-975b5",
    storageBucket: "",
    messagingSenderId: "32299160122",
    appId: "1:32299160122:web:6e0166421fc901c5"
}

export const createUserProfileDocument = async(userAuth,additionalData) =>{
   if(!userAuth) return;
   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapshot = await userRef.get();
   if(!snapshot.exist){
       
      const {displayName,email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
      }catch(error){
            console.log('error creating user', error);
      }
   }
   return userRef;
   //console.log(snapshot);

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const providor = new firebase.auth.GoogleAuthProvider();
providor.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(providor);

export default firebase;