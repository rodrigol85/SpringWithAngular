import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  public listaCategorie(){
    return this.http.get(`${baseUrl}/categoria/`);
  }

  public addCategoria(categoria:any){
    return this.http.post(`${baseUrl}/categoria/`, categoria);
  }

  public deleteCategoria(categoriaId:any){
    return this.http.delete(`${baseUrl}/categoria/${categoriaId}`)
  }
}
