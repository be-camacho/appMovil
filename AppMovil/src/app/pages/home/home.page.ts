import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BackgroundAnimationComponent  } from 'src/app/components/animated-background/animated-background.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild(BackgroundAnimationComponent ) animatedBackground!: BackgroundAnimationComponent ;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){    
  }

}
