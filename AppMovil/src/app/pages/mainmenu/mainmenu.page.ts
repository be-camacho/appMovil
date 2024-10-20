import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {
  user: any;
  constructor(private router:Router,public auth:AuthService,) {}

  ngOnInit() {}

  async logout() {
    this.auth.logout().then(()=>{
      this.router.navigate(['/home'])
    })
  }

}
