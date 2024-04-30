import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../Services/categoria.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-categorie',
  templateUrl: './view-categorie.component.html',
  styleUrl: './view-categorie.component.css'
})
export class ViewCategorieComponent implements OnInit {

  categorie : any = [ ]

  constructor(private categoriaService :  CategoriaService, private snack: MatSnackBar){}




  ngOnInit(): void {
    this.categoriaService.listaCategorie().subscribe(
      (dato:any) => {
        this.categorie = dato;
        console.log(this.categorie);
      },
      (error) => {
        console.log(error);
        Swal.fire('Errore!!!', 'Errore al caricare categorie' , 'error');
      }
    )
  }

  deleteCategoria(categoriaId:any){
    Swal.fire({
      title:'Cancella domanda',
      text:'Sei sicuro di voler cancellarlo?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Cancella',
      cancelButtonText:'Annullare'
    }).then((risultato) =>{
      if(risultato.isConfirmed){
        this.categoriaService.deleteCategoria(categoriaId).subscribe(
          (data) => {
            this.snack.open('Categoria Cancellata', '', {
              duration:2000
            })
            console.log('Errore cancellare categoria: ' + categoriaId);
            this.categorie = this.categorie.filter((categoria:any) => categoria.id != categoriaId);
          },
          (error) => {
            this.snack.open(`S'è verificato un errore`, `non s'è potuto cancellare la categoria`, {
              duration: 2000
            })
            console.log(error);
          }
        )
      }

  })
}

}
