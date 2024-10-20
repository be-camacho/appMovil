import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore,doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firestore: Firestore;
  constructor(public ngFireAuth: AngularFireAuth) { 
  const app = initializeApp(environment.firebaseConfig);
  this.firestore = getFirestore(app);
  }
  async registerUser(email:string,password:string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }
  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
  }
  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }
  async logout() {
    return await this.ngFireAuth.signOut()
  }
  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
  createDocumentID(data:any,enlace:string,idDoc:string){
    const document = doc(this.firestore,`${ enlace }/${ idDoc }`);
    return setDoc(document,data);
  }
}
