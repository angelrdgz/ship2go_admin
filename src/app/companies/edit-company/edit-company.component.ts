import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  public company:any;
  public user:any = {name:'', email:'', phone:'', password:'', password_confirm:''};
  public companyId:string;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('id');
      this.getCompany(params.get('id'))
    });
  }

  getCompany(id){
    this._apiService.getCompany(id).subscribe(
      data => {
        this.company = data.data
        this.user.name = data.data.user.name
        this.user.email = data.data.user.email
        this.user.phone = data.data.user.phone
      },
      err => console.error(err),
      () => console.log(this.company)
    );
  }

  updateCompany(){
    this._apiService.updateCompany(this.companyId, {company:this.company, user:this.user}).subscribe(
      data => {
      },
      err => console.error(err),
      () => this.router.navigate(['admin/companies'])
    );
  }

}
