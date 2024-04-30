import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomandaService } from '../../../../Services/domanda.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-add-domanda',
  templateUrl: './add-domanda.component.html',
  styleUrl: './add-domanda.component.css'
})
export class AddDomandaComponent implements OnInit {


  esameId: any;
  titolo: any;
  domanda: any = {
    esame : {},
    contenuto : '',
    opzione1 : '',
    opzione2 : '',
    opzione3 : '',
    opzione4 : '',
    risposta : ''
  }

  constructor(
    private route: ActivatedRoute,
    private domandaService: DomandaService
  ){}




  ngOnInit(): void {
    this.esameId = this.route.snapshot.params['esameId'];
    this.titolo = this.route.snapshot.params['titolo'];
    this.domanda.esame['esameId'] = this.esameId;

   

  }

  formSubmit(){
    if(this.domanda.contenuto.trim() == '' || this.domanda.contenuto == null){
      return;
    }
    if(this.domanda.opzione1.trim() == '' || this.domanda.opzione1 == null){
      return;
    }
    if(this.domanda.opzione2.trim() == '' || this.domanda.opzione2 == null){
      return;
    }
    if(this.domanda.opzione3.trim() == '' || this.domanda.opzione3 == null){
      return;
    }
    if(this.domanda.opzione4.trim() == '' || this.domanda.opzione4 == null){
      return;
    }
    if(this.domanda.risposta.trim() == '' || this.domanda.risposta == null){
      return;
    }

    this.domandaService.saveDomanda(this.domanda).subscribe(
      (data) => {
        Swal.fire('Domanda salvata', 'Operazione avvenuta con successo', 'success');
        this.domanda.contenuto = '';
        this.domanda.opzione1 = '';
        this.domanda.opzione2 = '';
        this.domanda.opzione3 = '';
        this.domanda.opzione4 = '';
        this.domanda.risposta = '';
      },
      (error) => {
        Swal.fire('Errore', 'Errore verificato con il salvataggio', 'error');
        console.log(error);

      }
    )
  }

}
