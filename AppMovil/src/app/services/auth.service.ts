import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore,doc,getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(initializeApp(environment.firebaseConfig));
  private firestore: Firestore;
  constructor(public ngFireAuth: AngularFireAuth) { 
  const app = initializeApp(environment.firebaseConfig);
  this.firestore = getFirestore(app);
  setPersistence(this.auth, browserLocalPersistence)
      .then(() => {
        console.log('Persistencia de sesión configurada en local.');
      })
      .catch((error) => {
        console.error('Error configurando la persistencia de sesión:', error);
      });
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
  
  async isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
