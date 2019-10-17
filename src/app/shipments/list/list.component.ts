import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public shipments:any = [];

  public search:any = {trackingNumber:'', company:'angelrodriguez@ucol.mx'}

  constructor(private _apiService: ApiService) { }

  ngOnInit() {  
  }

  pickShipment(id){

    this._apiService.pickShipment(id).subscribe(
      data => { 
        console.log(data)
        if(data.data.meta == 'error'){
          Swal.fire(
            'Error',
            data.data.error.message,
            'error'
          )
        }else{
          this.updateSpipment(id, data.data)
          Swal.fire(
            'Éxito',
            'Recolección agendada.',
            'success'
          )

        }
      },
      err => console.error(err),
      () => ""
    );

  }

  refundShipment(id){

    Swal.fire({
      title: '¿Desea reembolsar?',
      text: 'La compañia o el usuario recuperara el costo de la guía cancelada',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._apiService.refundShipment(id).subscribe(
          data => { 
            if(data.data.meta == 'error'){
              Swal.fire(
                'Error',
                data.data.error.message,
                'error'
              )
            }else{
              this.updateSpipment(id, data.data)
              Swal.fire(
                'Éxito',
                'Su guía ha sido cancelada correctamente.',
                'success'
              )

            }
          },
          err => console.error(err),
          () => ""
        );
      }
    })

  }

  searchLabels(){

    this._apiService.searchLabels(this.search).subscribe(
      data => { 
        this.shipments = data.data
      },
      err => console.error(err),
      () => console.log(this.shipments)
    );

  }

  getShipments(){
    this._apiService.getShipments().subscribe(
      data => { this.shipments = data.data},
      err => console.error(err),
      () => console.log(this.shipments)
    );
  }

  updateSpipment(id, data) {
    for (let index = 0; index < this.shipments.length; index++) {
      if(this.shipments[index].id == id){
        this.shipments[index] = data;
        break
      }
    }
  }

  cancelShipment(id){
    Swal.fire({
      title: '¿Desea cancelar?',
      text: 'Usted no recuperara información de esta guía',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._apiService.cancelShipment(id).subscribe(
          data => { 
            if(data.data.meta == 'error'){
              Swal.fire(
                'Error',
                data.data.error.message,
                'error'
              )
            }else{
              this.updateSpipment(id, data.data)
              Swal.fire(
                'Éxito',
                'Su guía ha sido cancelada correctamente.',
                'success'
              )

            }
          },
          err => console.error(err),
          () => ""
        );
      }
    })
  }
}
