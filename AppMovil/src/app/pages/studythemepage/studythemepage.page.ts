import { Component, OnInit } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-studythemepage',
  templateUrl: './studythemepage.page.html',
  styleUrls: ['./studythemepage.page.scss'],
})
export class StudythemepagePage implements OnInit {

  studythemes: string[] = [];

  constructor(private userdataService : UserdataService){};

  ngOnInit() {
    this.userdataService.getuserdata<string>('studythemes').subscribe((data) => {
      if(data){
        this.studythemes = data;
      }
  
    });

  }
}
