import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../Services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    "username" : '',
    "password" : '',
  }

  constructor(private snack :  MatSnackBar, private loginService: LoginService, private router: Router) { }


  ngOnInit(): void {
  }

  formSubmit(){

    if(this.loginData.username.trim() == ' ' || this.loginData.username.trim() == null){
      this.snack.open('Il nome utente è obbligatorio !!','Accetto',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == ' ' || this.loginData.password.trim() == null){
      this.snack.open('La password è obbligatorio !!','Accetto',{
        duration:3000
      })
      return;
    }
   this.loginService.generateToken(this.loginData).subscribe(
    (data:any) => {
      console.log("username: " + this.loginData.username + " password: " + this.loginData.password);
      console.log(data);

       this.loginService.loginUser(data.token),
       this.loginService.getCurrentUser().subscribe((user:any) => {
        this.loginService.setUser(user);
         console.log(user);

         if(this.loginService.getUserRole() == "ADMIN"){
          window.location.href = '/admin';
          this.loginService.loginStatusSubject.next(true);
         }
         else if(this.loginService.getUserRole() == 'USER'){
          window.location.href = '/user';
          this.loginService.loginStatusSubject.next(true);
         }
         else{
          this.loginService.logout();
         }
       })

    },(error) => {
      console.log('Errore completo: ', error);
      this.snack.open('Credenziali non validi, riprocaci', 'Accetto',{
        duration:3000
      });

    }
   )
  }

}
