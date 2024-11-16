import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BackgroundAnimationComponent  } from 'src/app/components/animated-background/animated-background.component';
import { ViewWillEnter } from '@ionic/angular';
import { ApiConnectionService } from 'src/app/services/apiConnection.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit,ViewWillEnter {

  phrase: string;
  @ViewChild(BackgroundAnimationComponent ) animatedBackground!: BackgroundAnimationComponent ;
  constructor(private apiConnection:ApiConnectionService) { }

  ngOnInit() {
    this.apiConnection.getRandomPhrase().subscribe(
      data => {
        this.phrase = data;
      },
      error => {
        console.log(error);
      });
   }
  ngAfterViewInit(){    
  }
  ionViewWillEnter() {
   
  }

  
}
