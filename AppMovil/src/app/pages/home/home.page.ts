import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BackgroundAnimationComponent  } from 'src/app/components/animated-background/animated-background.component';
import { ZenquoteService } from 'src/app/services/zenquote.service';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit,ViewWillEnter {
  quote: string = '';
  @ViewChild(BackgroundAnimationComponent ) animatedBackground!: BackgroundAnimationComponent ;
  constructor(private zenQuotesService: ZenquoteService) { }

  ngOnInit() {
    
  }
  ngAfterViewInit(){    
  }
  ionViewWillEnter() {
    console.log('inicia la api');
    this.loadRandomQuote();
    console.log('termina la api');
  }

  loadRandomQuote() {
    this.zenQuotesService.getRandomQuote().subscribe({
      next: (data) => {
        this.quote = data[0].q + ' - ' + data[0].a;
        console.log("la api no paso por el error");
        console.log(this.quote);
      },
      error: (error) => {
        console.error('Error fetching quote:', error);
      }
    });
    console.log("la api paso por todo");
  }
}
