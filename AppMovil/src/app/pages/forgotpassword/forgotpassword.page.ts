import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundAnimationComponent  } from 'src/app/components/animated-background/animated-background.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit, AfterViewInit {
  @ViewChild(BackgroundAnimationComponent ) animatedBackground!: BackgroundAnimationComponent ;
  email:any;
  constructor(
    private authService: AuthService,
    public route:Router

  ) { }

  ngOnInit() {
  }
  ngAfterViewInit(){    
  }
  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>{
    console.log('reset link sent')
    this.route.navigate(['/login'])
    }).catch((error)=>
      console.log(error)
    )
  }
}
