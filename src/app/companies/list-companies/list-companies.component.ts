import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {

  public companies: any;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this._apiService.getCompanies().subscribe(
      data => {
        this.companies = data.data
      },
      err => console.error(err),
      () => console.log(this.companies)
    );
  }

  activeCompany(id) {
    this._apiService.activeCompany(id).subscribe(
      data => {
        this.updateCompany(id, data.data)
      },
      err => console.error(err),
      () => this.showSwal('success', 'Compañia activada con exito')
    );
  }

  unactiveCompany(id) {
    this._apiService.unactiveCompany(id).subscribe(
      data => {
        this.updateCompany(id, data.data)
      },
      err => console.error(err),
      () => this.showSwal('success', 'Compañia desactivada con exito')
    );
  }

  updateCompany(id, data) {
    for (let index = 0; index < this.companies.length; index++) {
      if(this.companies[index].id == id){
        this.companies[index] = data;
        break
      }
    }
  }

  showSwal(type, message) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 5000,
      background: '#000'
    })

    Toast.fire({
      type: type,
      title: message,
    })
  }

}
