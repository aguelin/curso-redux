import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm?:FormGroup;
  cargando:boolean = false;
  uiSuscription?:Subscription;

  constructor( private fb:FormBuilder, private authService:AuthService, private router:Router, private store:Store<AppState>){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.uiSuscription = this.store.select('ui').subscribe( ui => {

      this.cargando = ui.isLoading;

    });
  }

  ngOnDestroy(): void {
    this.uiSuscription?.unsubscribe();
  }

  loginUsuario(){

    if(this.loginForm?.invalid) return;

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => {
    //     Swal.showLoading();

    //   }
    // })

    const {correo,password} = this.loginForm?.value;
    this.authService.loginUsuario(correo,password)
      .then( credenciales =>{
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message
        });
      })

  }


}
