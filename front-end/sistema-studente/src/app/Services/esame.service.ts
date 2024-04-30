import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EsameService {

  constructor(private http:HttpClient) { }

  public listaDomande(){
    return this.http.get(`${baseUrl}/esame/`);
  }

  public addEsame(esame : any){
    return this.http.post(`${baseUrl}/esame/`, esame);
  }
  public deleteEsame(esameId : any){
    return this.http.delete(`${baseUrl}/esame/${esameId}`);
  }
  public getEsame(esameId : any){
    return this.http.get(`${baseUrl}/esame/${esameId}`);
  }
  public aggiornaEsame(esame : any){
    return this.http.put(`${baseUrl}/esame/`, esame);
  }

  public listaEsamiDiUnaCategoria(categoriaId:any){
    return this.http.get(`${baseUrl}/esame/categoria/${categoriaId}`);
  }

  public getEsamiAttivi(){
    return this.http.get(`${baseUrl}/esame/attivo`);
  }

  public getEsamiAttiviDiUnaCategoria(categoriaId:any){
    return this.http.get(`${baseUrl}/esame/categoria/attivo/${categoriaId}`);
  }
}
