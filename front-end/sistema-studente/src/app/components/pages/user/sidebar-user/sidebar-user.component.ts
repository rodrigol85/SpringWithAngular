import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../Services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrl: './sidebar-user.component.css'
})
export class SidebarUserComponent implements OnInit{

  categorie:any;

  constructor(
    private categoriaService: CategoriaService,
    private snack:MatSnackBar
  ){}

  ngOnInit(): void {
    this.categoriaService.listaCategorie().subscribe(
      (data:any) => {
        this.categorie = data;
      },
      (error) => {
        this.snack.open(`S'è verificato un errore al caricare le categorie`, ``,{
          duration:3000
        })
        console.log(error);
      }
    )

  }

}
