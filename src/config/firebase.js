import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBjVyaNKTzICLtL4kRVhEjOps-ZWs6G5-U",
    authDomain: "react-sample-f2fe0.firebaseapp.com",
    projectId: "react-sample-f2fe0",
    storageBucket: "react-sample-f2fe0.appspot.com",
    messagingSenderId: "711188222931",
    appId: "1:711188222931:web:acee20b20c2472d3ad1526"
}
 
firebase.initializeApp(firebaseConfig)


export const db = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()

export const POST_IMG_URL = 'https://firebasestorage.googleapis.com/v0/b/react-sample-f2fe0.appspot.com/o/posts%2F'
export const MEDIA = '?alt=media'