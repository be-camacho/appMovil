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

  constructor(
    private authService : AuthService,
    private firebaseService: FirebaseService,
    ){}


  newStudyTheme: StudyThemeI;
  themeList: StudyThemeI[] = [];
  newsubthemeList: SubthemeI[] = [];
  selectedlist = 0;
  list = []
  ngOnInit() {
    this.loadStudyThemes();
  }

  async loadStudyThemes() {
    try {
      const currentUser = await this.authService.getProfile();
      if (currentUser) {
        const uid = currentUser.uid;
        this.firebaseService.getCollectionChanges<StudyThemeI>(`Users/${uid}/studythemes`).subscribe((data) => {
          if (data) {
            this.themeList = data;
          }
        });
      } else {
        console.error('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error loading study themes:', error);
    }
  }

  onItemClick() {
    if (this.selectedlist === 0) {
      this.list = this.themeList;
      this.selectedlist = 1;
    } else if (this.selectedlist === 1) {
      this.list = this.themeList;
      this.selectedlist = 2;
    } else if (this.selectedlist === 2) {
      // pregunta cuantas pregunta quiere en esta ronda pero debo calcular el total de preguntas
    }
  }
}
