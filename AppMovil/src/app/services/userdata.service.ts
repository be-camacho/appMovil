import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  
  userId:any
  
  constructor(private authService:AuthService) { 
    this.authService.getProfile().then(user =>{
      this.userId = user.uid
      console.log(this.userId);

    })
    



  }







}
