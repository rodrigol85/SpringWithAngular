import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }


  //genera un token
  public generateToken(loginData : any){

    return this.httpClient.post(`${baseUrl}/generate-token`, loginData);
  }

  public getCurrentUser(){
    return this.httpClient.get(`${baseUrl}/attuale-utente`);
  }

  //iniziamo session
  public loginUser(token:any){
    if(typeof localStorage !== 'undefined'){
    localStorage.setItem('token', token);
  }else
  return undefined;
}

  public isLoggedIn() {
    if (typeof localStorage !== 'undefined') {
      let tokenStr = localStorage.getItem('token');
      if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
        return false;
      } else {
        return true;
      }
    } else {

      return false;
    }
  }


  //close session
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    if(typeof localStorage !== 'undefined'){
    localStorage.setItem('user', JSON.stringify(user));
  } else{
    return undefined
  }
  }
  public getUser(){
    if (typeof localStorage !== 'undefined') {
      let userStr = localStorage.getItem('user');
      if(userStr != null){
        return JSON.parse(userStr);
      }else {
        this.logout();
        return null;
      }
    } else {
      return null
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
