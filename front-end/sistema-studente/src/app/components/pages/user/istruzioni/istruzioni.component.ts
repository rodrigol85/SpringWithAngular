import { Component, OnInit } from '@angular/core';
import { EsameService } from '../../../../Services/esame.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-istruzioni',
  templateUrl: './istruzioni.component.html',
  styleUrl: './istruzioni.component.css'
})
export class IstruzioniComponent implements OnInit{


  esameId: any;
  esame:any = new Object();

  constructor(
    private esameService: EsameService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.esameId = this.route.snapshot.params['esameId'];
    this.esameService.getEsame(this.esameId).subscribe(
      (data:any) => {
        console.log(data);
        this.esame = data;
      },
      (error) => {
        console.log(error);
      }
    )

  }

  iniziaTest(){
    Swal.fire({
      title:'Vuole iniziare il test',
      showCancelButton:true,
      cancelButtonText:'Cancella',
      confirmButtonText:'Inizia',
      icon:'info'
    }).then((risult:any) =>{
      if(risult.isConfirmed){
        this.router.navigate(['/start/'+this.esameId]);
      }
    })
  }

}
