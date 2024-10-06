import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BackgroundAnimationComponent  } from 'src/app/components/animated-background/animated-background.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit, AfterViewInit {
  @ViewChild(BackgroundAnimationComponent ) animatedBackground!: BackgroundAnimationComponent ;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){    
  }

}
