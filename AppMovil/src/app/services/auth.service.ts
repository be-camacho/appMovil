import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore,doc,setDoc,getDoc } from 'firebase/firestore';
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
  async getUserData(uid: string) {
    const userDoc = doc(this.firestore, `Users/${uid}`);
    const userSnapshot = await getDoc(userDoc);
    return userSnapshot.exists() ? userSnapshot.data() : null;
  }
}
