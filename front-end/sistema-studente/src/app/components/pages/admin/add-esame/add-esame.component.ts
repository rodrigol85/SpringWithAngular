import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../Services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EsameService } from '../../../../Services/esame.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-esame',
  templateUrl: './add-esame.component.html',
  styleUrl: './add-esame.component.css'
})
export class AddEsameComponent implements OnInit {

  categorie:any = [];

  esameData = {
    titolo:'',
    descrizione:'',
    puntiMax:'',
    numeDomande:'',
    attivo:true,
    categoria:{
      id:''
    }
  }

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private esameService:EsameService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoriaService.listaCategorie().subscribe(
      (dato:any) => {
        this.categorie = dato;
        console.log(this.categorie);
      },(error) =>{
        console.log(error);
        Swal.fire('Errore!!!', 'Verificato un errore', 'error');
      }
    )
  }

  salvaEsame(){
    console.log(this.esameData);
    if(this.esameData.titolo.trim() == '' || this.esameData.titolo.trim() == null ){
      this.snack.open('Inserisca il titolo', '', {
        duration: 3000
      });
      return;
    }
    this.esameService.addEsame(this.esameData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Esame salvato', 'Operazione avvenuta con successo', 'success');
        this.esameData = {
          titolo : '',
          descrizione: '',
          puntiMax: '',
          numeDomande: '',
          attivo : true,
          categoria: {
            id: ''
          }
        }
        this.router.navigate(['/admin/esami']);
      },
      (error) => {
        Swal.fire('Errore', 'Verificato un errore durante il salvataggio', 'error');
      }
    )
  }

}
