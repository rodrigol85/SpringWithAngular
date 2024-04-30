import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomandaService } from '../../../../Services/domanda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aggiorna-domanda',
  templateUrl: './aggiorna-domanda.component.html',
  styleUrl: './aggiorna-domanda.component.css'
})
export class AggiornaDomandaComponent implements OnInit {

  domandaId:any = 0;
  domanda:any;
  esame:any;

  constructor(
    private route:ActivatedRoute,
    private domandaService :DomandaService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.domandaId = this.route.snapshot.params['domandaId'];
    this.domandaService.getDomanda(this.domandaId).subscribe(
      (data:any) => {
        this.domanda = data;
        console.log(this.domanda);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  public aggiornaDatiDellaDomanda(){
    this.domandaService.aggiornareDomanda(this.domanda).subscribe(
      (data) => {
        Swal.fire('Domanda Aggiornata', `L'operazione è andata a buon fine`, 'success').then((e) => {
          this.router.navigate(['/admin/vedere-domande/'+this.domanda.esame.exameId+'/'+this.domanda.esame.titolo]);
        })
      }

    )
  }

}
