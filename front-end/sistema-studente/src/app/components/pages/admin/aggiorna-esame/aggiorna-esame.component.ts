import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsameService } from '../../../../Services/esame.service';
import { CategoriaService } from '../../../../Services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aggiorna-esame',
  templateUrl: './aggiorna-esame.component.html',
  styleUrl: './aggiorna-esame.component.css'
})
export class AggiornaEsameComponent implements OnInit{

  constructor(
    private route:ActivatedRoute,
    private esameService:EsameService,
    private categoriaService:CategoriaService,
    private router:Router
  ){}

  esameId = 0;
  esame :  any;
  categorie : any;

  ngOnInit(): void {
    this.esameId = this.route.snapshot.params['esameId'];
    this.esameService.getEsame(this.esameId).subscribe(
      (data) => {
        this.esame = data;
        console.log(this.esame);
      },
      (error) => {
        console.log(error);
      }
    )

    this.categoriaService.listaCategorie().subscribe(
      (data:any) => {
        this.categorie = data;
      },
      (error) => {
        alert(`S'è verificato un errore al caricare le categorie`);
      }
    )

  }

  public aggiornaDati(){
    this.esameService.aggiornaEsame(this.esame).subscribe(
      (data) => {
        Swal.fire('Esame aggiornato', 'Aggiornamento avvenuto con successo', 'success').then(
          (e) => {
            this.router.navigate(['/admin/esami']);
          }
        );
      },
      (error) =>{
        Swal.fire('Errore', 'Aggiornamento non avvenuta a buon fine', 'error');
        console.log(error);
      }
    )
  }

}
