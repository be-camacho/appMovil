import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subthemepage',
  templateUrl: './subthemepage.page.html',
  styleUrls: ['./subthemepage.page.scss'],
})
export class SubthemepagePage implements OnInit {

  items: string[] = [];
  list: string[] = ["Ingles", "matematica"];
  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 15; i++) {
      this.items.push(`unidad ${count + i}`);
    }
  }
}
