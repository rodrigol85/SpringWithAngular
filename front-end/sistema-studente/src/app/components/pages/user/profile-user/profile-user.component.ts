import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../Services/login.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {

  user:any = null;

  constructor(private loginService : LoginService){}


  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

}
