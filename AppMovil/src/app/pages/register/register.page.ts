import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserI } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EmailService } from 'src/app/services/email.service';

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
    private firesbaseservice: FirebaseService,
    public router: Router,
    private emailService: EmailService
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
    if(this.regForm.valid) {//si el formulario es valido registra el usuario en firebase authentication
      const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss()
      })

      if(user){//si se logro crear ese usuario 
        const iud = (await this.authService.getProfile()).uid;//guarda el uid en una constante
        this.newUser = { //inicializa el objeto newUser con los valores del formulario y el uid
          name: this.regForm.value.name,  
          lastname: this.regForm.value.lastname,
          email: this.regForm.value.email,
          id: iud
        }
        this.firesbaseservice.createDocumentID(this.newUser, 'Users',this.newUser.id)//crea el usuario nuevo en la colección Users de firestore
        const templateParams = {
          to_name: this.regForm.value.name,
          from_name: 'Twolingo',
          message: 'Bienvenido a Twolingo, gracias por formar parte de nuestra comunidad',
          to_email: this.regForm.value.email
        };
        this.emailService.sendEmail(templateParams).then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
          },
          (error) => {
            console.log('FAILED...', error);
          }
        );
        loading.dismiss()
        this.router.navigate(['/login'])
      }else{
        console.log('provide correct values')
        
      }
    }loading.dismiss()
  }
  
}