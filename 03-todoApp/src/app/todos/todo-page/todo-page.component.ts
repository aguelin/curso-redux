import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {

  completado:boolean = false;

  constructor(private store:Store<AppState>){}

  toggleAll(){
    this.completado = !this.completado;

    this.store.dispatch(actions.toggleAll({completado:this.completado}));
  }

}
