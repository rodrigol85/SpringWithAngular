import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EsameService } from '../../../../Services/esame.service';

@Component({
  selector: 'app-loaad-esame',
  templateUrl: './loaad-esame.component.html',
  styleUrl: './loaad-esame.component.css'
})
export class LoaadEsameComponent implements OnInit{

  catId :any;
  esami:any;

  constructor(private route:ActivatedRoute, private esameService:EsameService){}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];

      if(this.catId == 0){
        console.log("caricando tutti i test");
        this.esameService.getEsamiAttivi().subscribe(
          (data) => {
            this.esami = data;
            console.log(this.esami);
          },
          (error) => {
            console.log(error);
          }
        )

      }

      else {
        console.log("Caricando un test specifico");
        this.esameService.getEsamiAttiviDiUnaCategoria(this.catId).subscribe(
          (data:any) => {
            this.esami = data;
            console.log(this.esami);
          },
          (error) => {
            console.log(error);
          }
        )
      }


    })

  }

}
