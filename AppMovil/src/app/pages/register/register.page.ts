import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserI } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regForm: FormGroup;

  newUser: UserI;
  
  constructor(
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ],
      ],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm.valid) {
      const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss()
      })

      if(user){
        const token = (await this.authService.getProfile()).uid;
        this.newUser = {
          name: this.regForm.value.name,  
          lastname: this.regForm.value.lastname,
          email: this.regForm.value.email,
          id: token
        }
        this.authService.createDocumentID(this.newUser, 'Users',this.newUser.id)
        console.log(this.newUser)
        loading.dismiss()
        this.router.navigate(['/login'])
      }else{
        console.log('provide correct values')
        
      }
    }loading.dismiss()
  }
}