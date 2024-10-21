import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private firestore: Firestore = inject(Firestore);

  constructor() { }

  getuserdata<tipo>(path: string,enlace:string){
    const userProfileCollection = collection(this.firestore, 'users');
    return collectionData(userProfileCollection) as Observable<tipo[]>;
  }

}
