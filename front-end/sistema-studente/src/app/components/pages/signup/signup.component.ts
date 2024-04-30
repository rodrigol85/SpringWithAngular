import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    name : '',
    surname : '',
    email : '',
    phone : ''
  }
  constructor(private userService : UserService, private snack : MatSnackBar){}


  ngOnInit(): void {

  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('Username is required!!!', 'Acept', {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.addNewUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('User saved', 'your profile was saved successfully', 'success')
      },(error) =>{
        console.log(error);
        this.snack.open('Something wrong happened', 'Acept', {
          duration : 3000,
          verticalPosition : 'top',
          horizontalPosition : 'right'
        });
      }
    )
  }

}
