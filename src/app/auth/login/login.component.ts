import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  toasts: any[] = [];
  email:string='';

  loginForm: FormGroup;
  loginError: string;
  loginErrors: any = { email: '', password: '' };
  data: any;
  public loading: boolean = false;


  constructor(
    private _apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    public toastService: ToastService
  ) {
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    if (localStorage.getItem('token_user') !== null) {
      this.router.navigate(['admin/dashboard'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  resendEmail(){

    this._apiService.resendEmail({email: this.email}).subscribe(
      data => {  },
      err => {
        this.showSwal('error', err.error.message)
      },
      () => {
        this.showSwal('success', 'Enviamos un email de confirmación a tu cuenta')
      }
    );

  }

  login(form) {

    this.loginErrors = { email: '', password: '' };

    this.loading = true;

    this._apiService.login(form.value).subscribe(
      data => { this.data = data },
      err => {

        switch (err.status) {
          case 0: {
            this.showSwal('error', 'Internet conection error')
            break;
          }
          case 401: {
            this.showSwal('error', 'Email o contraseña incorrectos')
            break;
          }
          case 422: {
            this.loginErrors = err.error.errors
            break;
          }
          case 400: {
            Swal.fire({
              title: 'Cuenta no verificada',
              text: "¿Desea que reenviemos un correo de activación?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
              customClass: {
                confirmButton: 'btn-app-blue',
                cancelButton: 'btn-app-gray',
              }
            }).then((result) => {
              if (result.value) {
                this.resendEmail();
              }
            })
            break;
          }
          default: {
            this.loginError = ''
            break;
          }


        }
        this.loading = false;
        console.log(err)
      },
      () => {
        //console.log(this.data)
        this.loading = false;
        localStorage.setItem('user_ses', JSON.stringify(this.data.user))
        localStorage.setItem('token_user', this.data.api_key)
        this.router.navigate(['admin/dashboard'])
      }
    );
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
