import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../Services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css'
})
export class AddCategoriaComponent implements OnInit {

  categoria = {
    titolo : '',
    descrizione: ''
  }

  constructor(private categoriaService: CategoriaService, private snack:MatSnackBar, private router:Router){}



  ngOnInit(): void {

  }

  formSubmit(){
    if(this.categoria.titolo.trim() == '' || this.categoria.titolo == null){
      this.snack.open("Il titole è obbligatorio!!!", '', {
        duration:3000
      })
      return
    }
    this.categoriaService.addCategoria(this.categoria).subscribe(
      (dato:any) => {
        this.categoria.titolo = '';
        this.categoria.descrizione = '';
        Swal.fire('Categoria aggiunta', 'La categoria è stata salvata con successo', 'success');
        this.router.navigate(['/admin/categorie']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Errore!!!', 'Verificato un errore nel salvataggio', 'error')
      }
    )
  }

}
