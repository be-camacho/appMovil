import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewQuestionsRoundComponent } from 'src/app/components/new-questions-round/new-questions-round.component';
import { PhotosComponent } from 'src/app/components/photos/photos.component';
import { UserI } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {
  user: UserI;
  isActiveModal: boolean = false;
  uid: string;
  constructor(
    private router:Router,
    public auth:AuthService, 
    private firebaseService:FirebaseService,
    private modalController: ModalController,) {}

  async ngOnInit() {

    const currentUser = await this.auth.getProfile();
    if (currentUser) {
      this.uid = currentUser.uid;
      this.firebaseService.getDocumentChanges<UserI>(`Users/${this.uid}`).subscribe((data) => {
        if(data){
          this.user = data;
        }
      });
      this.user = await this.auth.getUserData(this.uid) as UserI;
    }
  }
  async logout() {
    this.auth.logout().then(()=>{
      this.router.navigate(['/home'])
      console.log('Sesión cerrada');
    })
  }
  async openPhotoModal() {
    const modal = await this.modalController.create({
      component: PhotosComponent,
      componentProps: {}
    });
    return await modal.present();
  }
  async openModal() {
    this.isActiveModal = true;
  }
  async closeModal() {
    this.isActiveModal = false;
  }
}
