import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionI } from 'src/app/models/questions.models';

@Component({
  selector: 'app-timeofquestions',
  templateUrl: './timeofquestions.page.html',
  styleUrls: ['./timeofquestions.page.scss'],
})
export class TimeofquestionsPage implements OnInit {
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.questions = navigation.extras.state['questions'];
      this.correctAnswers = navigation.extras.state['correctAnswers'];
    }
  }
  questionNumber: number = 1;
  questions:QuestionI[] = [];
  correctAnswers:string[];
  currentQuestionIndex: number = 0;
  question:QuestionI;

  ngOnInit() {
    this.processQuestions();
  }
  processQuestions() {
    this.questions.forEach((question, index) => {
      console.log(`Pregunta ${index + 1}:`, question);
      question.answers = this.aleartoryAnswers(question.answers);
      this.question = question;
    });
  }
  aleartoryAnswers(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onItemClick(answer: string) {
    console.log('Respuesta seleccionada:', answer);
    console.log(this.questions);
    console.log(this.correctAnswers);
    
    // Verificar si la respuesta seleccionada es correcta
    const correctAnswer = this.correctAnswers[this.currentQuestionIndex];
    if (answer === correctAnswer) {
      console.log('Respuesta correcta');
    } else {
      console.log('Respuesta incorrecta');
    }

    // Avanzar a la siguiente pregunta
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.questionNumber++;
      this.question = this.questions[this.currentQuestionIndex];
    } else {
      console.log('Fin de las preguntas');
      // Lógica para manejar el fin de las preguntas
      this.questions = [];
      this.correctAnswers = [];
      this.currentQuestionIndex = 0;
      this.router.navigate(['/mainmenu']);
    }
  }

}
