import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomandaService } from '../../../../Services/domanda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit{


  esameId:any;
  domande:any;
  puntiOttenuti = 0;
  risposteGiuste = 0;
  tentativi = 0;

  isSended = false;
  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private domandaService:DomandaService
  ){}





  ngOnInit(): void {
    this.evitareTornareIndientro();
    this.esameId= this.route.snapshot.params['esameId'];
    console.log(this.esameId);
    this.caricareDomande();
  }

  caricareDomande(){
    this.domandaService.listaDomandeDellEsamePerIlTest(this.esameId).subscribe(
      (data:any) => {
        console.log(data);
        this.domande = data;

        this.timer = this.domande.length *2 * 60;

        this.domande.forEach((p:any) => {
          p['rispostaData'] = '';

        })
        console.log(this.domande);
        this.iniziareTemporizator();
      },
      (error) => {
        console.log(error);
        Swal.fire('Errore', `S'è verificato un errore`, 'error');
      }
    )
  }

  iniziareTemporizator(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.valutareEsame();
        clearInterval(t);
      }else{
        this.timer --;
      }
    },1000)
  }


  evitareTornareIndientro(){
    history.pushState(null,null!, location.href);
    this.locationSt.onPopState(() =>{
      history.pushState(null, null!, location.href);
    })
  }

  inviareTest(){
    Swal.fire({
      title: 'Vuoi finire il test?',
      showCancelButton:true,
      cancelButtonText:'Annulla',
      confirmButtonText:'Invia',
      icon:'info'
    }).then((e) => {
      if(e.isConfirmed){
        this.valutareEsame();
      }
    })
  }

  valutareEsame(){
    this.domandaService.valutazioneEsame(this.domande).subscribe(
      (data:any) => {
        console.log(data);
        this.puntiOttenuti = data.puntiMax;
        this.risposteGiuste = data.risposteGiuste;
        this.isSended = true;
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  getFormattedHour(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} ss`;
  }

  printPage(){
    window.print();
  }

}
