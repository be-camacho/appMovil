import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {  provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ThememodalComponent } from './components/thememodal/thememodal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddQuestionModalComponent } from './components/addquestionmodal/addquestionmodal.component';
import { PhotosComponent } from './components/photos/photos.component';
import { SQLite } from '@ionic-native/sqlite/ngx'; // Importa SQLite
import { SQLiteService } from './services/SQLite.service'; // Importa el servicio SQLite
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { share } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    ThememodalComponent,
    AddQuestionModalComponent,
    PhotosComponent,
    
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    
  ],
  providers: [{ provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp({"projectId":"datamobileapp-b2ace","appId":"1:20503300175:web:041f32b1b3e851156e423a","storageBucket":"datamobileapp-b2ace.appspot.com","apiKey":"AIzaSyCqyjrYSVarEOS6w-LhWDjQVpUlIpEQj68","authDomain":"datamobileapp-b2ace.firebaseapp.com","messagingSenderId":"20503300175"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    SQLite,
    SQLiteService,
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}