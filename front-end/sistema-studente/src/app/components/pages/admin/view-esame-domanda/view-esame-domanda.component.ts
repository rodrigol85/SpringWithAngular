import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomandaService } from '../../../../Services/domanda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-esame-domanda',
  templateUrl: './view-esame-domanda.component.html',
  styleUrl: './view-esame-domanda.component.css'
})
export class ViewEsameDomandaComponent implements OnInit{

  esameId:any;
  titolo:any;
  domande : any = [];

  constructor(
    private route:ActivatedRoute,
    private domandaService: DomandaService,
    private snack: MatSnackBar
  ){}




  ngOnInit(): void {

    this.esameId = this.route.snapshot.params['esameId'];
    this.titolo = this.route.snapshot.params['titolo'];
    this.domandaService.listaDomandeDiEsame(this.esameId).subscribe(
      (data:any) => {
        console.log(data);
        this.domande = data;
      },
      (error) => {
        console.log(error);
      }
    )


  }

  deleteDomanda(domandaId:any){
    Swal.fire({
      title:'Cancella domanda',
      text:'Sei sicuro di voler cancellarlo?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Cancella',
      cancelButtonText:'Non cancellare'
    }).then((risultato) =>{
      if(risultato.isConfirmed){
        this.domandaService.deleteDomanda(domandaId).subscribe(

          (data) => {
            this.snack.open('Domanda cancellata', '', {
              duration:3000
            })
            console.log("ERRORE "+domandaId);
            this.domande = this.domande.filter((domanda:any) => domanda.id != domandaId);
          },
          (error) =>{
            this.snack.open(`S'è verificato un errore`, `non può cancellare se ci sono delle domande`,{

              duration:3000
            })
            console.log(error);

          }
        )
      }
    })

  }

}
