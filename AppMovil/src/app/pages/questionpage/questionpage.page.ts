import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionpage',
  templateUrl: './questionpage.page.html',
  styleUrls: ['./questionpage.page.scss'],
})
export class QuestionpagePage implements OnInit {
  items: string[] = [];
  list: string[] = ["Ingles", "matematica"];
  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 15; i++) {
      this.items.push(`pregunta ${count + i}`);
    }
  }
}