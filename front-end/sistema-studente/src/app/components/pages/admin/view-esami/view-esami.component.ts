import { Component, OnInit } from '@angular/core';
import { EsameService } from '../../../../Services/esame.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-esami',
  templateUrl: './view-esami.component.html',
  styleUrl: './view-esami.component.css'
})
export class ViewEsamiComponent implements OnInit {

  esami : any = [ ]

  constructor(private esameService : EsameService){}


  ngOnInit(): void {
    this.esameService.listaDomande().subscribe(
      (dato: any) =>{
        this.esami = dato;
        console.log(this.esami);
      },
      (error) =>{
        console.log(error);
        Swal.fire('Errore', 'Verificato un errore', 'error');
      }
    )
  }

  deleteEsame(esameId:any){
    Swal.fire({
      title: 'Cancella esame',
      text: 'Sei sicuro di voler cancellare',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancellare',
      cancelButtonText: 'Non cancellare'

    }).then((risult) => {
      if(risult.isConfirmed){
        this.esameService.deleteEsame(esameId).subscribe(
          (data) => {
            this.esami = this.esami.filter((esame:any) => esame.id != esameId);
            Swal.fire('Esame cancellato', 'L esame è stato cancellato con successo', 'success');

          },
          (error) => {
            Swal.fire('Errore','non puo cancellare se ci sono delle domande' ,'error');
          }
        )
      }
    })
  }

}
