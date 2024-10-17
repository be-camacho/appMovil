import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {
  user: string = '';


  constructor(
    private router:Router,
    public auth:AuthService,
  ) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      const state = navigation.extras.state as { login:{ user:string; password: string}};
      this.user = state.login.user;
    }

  }

  ngOnInit() {}

  async logout() {
    this.auth.logout().then(()=>{
      this.router.navigate(['/home'])
    })
  }

}
