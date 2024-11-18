import { Component, OnInit } from '@angular/core';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { SubthemeI } from 'src/app/models/subtheme.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.page.html',
  styleUrls: ['./testpage.page.scss'],
})

export class TestpagePage implements OnInit {
  title = 'Crea una nueva pregunta';
  photo: string;
  constructor(){

  }

  ngOnInit() {

  }

  
}
