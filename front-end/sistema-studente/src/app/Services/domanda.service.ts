import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DomandaService {

  constructor(private http:HttpClient) { }

  public listaDomandeDiEsame(esameId:any){
    return this.http.get(`${baseUrl}/domanda/esame/tutte/${esameId}`);
  }
  public saveDomanda(domanda:any){
    console.log(domanda);
    return this.http.post(`${baseUrl}/domanda/`, domanda);
  }

  public deleteDomanda(domandaId:any){
    return this.http.delete(`${baseUrl}/domanda/${domandaId}`);
  }

  public aggiornareDomanda(domanda:any){
    return this.http.put(`${baseUrl}/domanda/`, domanda);
  }

  public getDomanda(domandaId:any){
    return this.http.get(`${baseUrl}/domanda/${domandaId}`);
  }

  public listaDomandeDellEsamePerIlTest(esameId:any){
    return this.http.get(`${baseUrl}/domanda/esame/tutte/${esameId}`);
  }

  public valutazioneEsame(domande:any){
    return this.http.post(`${baseUrl}/domanda/valutare-esame`, domande);
  }

}
