import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeofquestions',
  templateUrl: './timeofquestions.page.html',
  styleUrls: ['./timeofquestions.page.scss'],
})
export class TimeofquestionsPage implements OnInit {

  constructor() { }
  contQuestion = 1;
  questiontype = 1;
  question = "¿Cuantos disparos puede hacer jhin antes de recargar?";
  answers = ["uno","dos","tres","cuatro"];
  img ="";
  interval:any;
  timeLeft: number = 30;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  


}
