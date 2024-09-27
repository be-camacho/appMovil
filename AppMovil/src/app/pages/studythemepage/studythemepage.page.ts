import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-studythemepage',
  templateUrl: './studythemepage.page.html',
  styleUrls: ['./studythemepage.page.scss'],
})
export class StudythemepagePage implements OnInit {

  items: string[] = [];
  list: string[] = ["Ingles", "matematica"];
  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 15; i++) {
      this.items.push(`tema ${count + i}`);
    }
  }

}
