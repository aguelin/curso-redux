import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  userSubscription?:Subscription;

  constructor(public auth:AngularFireAuth, public firestore:AngularFirestore, private store:Store) { }

  initAuthListener() {

    return this.auth.authState.subscribe( fuser => {

      if(fuser){
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe( (fbUser:any) => {
            const user = Usuario.fromFirebase(fbUser)
            this.store.dispatch(authActions.setUser({user}))
          } )
      }else{
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
      }

    })

  }

  crearUsuario(nombre:string,email:string,password:string){

   return this.auth.createUserWithEmailAndPassword(email,password)
    .then( ({user}) => {
      const newUser = new Usuario(user?.uid!,nombre,email);

      return this.firestore.doc(`${user?.uid}/usuario`).set({...newUser});
    })

  }

  loginUsuario(email:string,password:string){

    return this.auth.signInWithEmailAndPassword(email,password);

  }

  logout(){

    return this.auth.signOut();

  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    )
  }

}
