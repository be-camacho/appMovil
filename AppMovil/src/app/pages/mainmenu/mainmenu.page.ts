import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {
  user: string = '';


  constructor(private router:Router) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      const state = navigation.extras.state as { login:{ user:string; password: string}};
      this.user = state.login.user;
    }

  }

  ngOnInit() {}

}
