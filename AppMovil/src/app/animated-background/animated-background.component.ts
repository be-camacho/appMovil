import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Animation,AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-animated-background',
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss']
})
export class BackgroundAnimationComponent implements OnInit {
  @ViewChild('wave1', { static: false }) wave1!: ElementRef;
  @ViewChild('wave2', { static: false }) wave2!: ElementRef;
  @ViewChild('wave3', { static: false }) wave3!: ElementRef;

  private animation!:Animation;
  constructor(private animationController: AnimationController) {}

  ngOnInit() {
  }
  ngAfterViewInit() {
      // Create animations
      const animation1 = this.animationController
      .create()
      .addElement(this.wave1.nativeElement)
      .duration(10000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translate(270px, 230px)' },
        { offset: 0.5, transform: 'translate(-334px, 180px)' },
        { offset: 1, transform: 'translate(270px, 230px)' }
      ]);

      const animation2 = this.animationController.create()
        .addElement(this.wave2.nativeElement)
        .duration(8000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translate(-270px, 230px)' },
          { offset: 0.6, transform: 'translate(243px, 220px)' },
          { offset: 1, transform: 'translate(-270px, 230px)' }
        ]);

      const animation3 = this.animationController.create()
        .addElement(this.wave3.nativeElement)
        .duration(6000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translate(0px, 230px)' },
          { offset: 0.4, transform: 'translate(-140px, 200px)' },
          { offset: 1, transform: 'translate(0px, 230px)' }
        ]);
    
      this.animation = this.animationController
      .create()
      .duration(3000)
      .iterations(Infinity)
      .addAnimation([animation1,animation2,animation3]);
      this.animation.play();
  }
}
