import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: [
  ]
})
export class NietoComponent {

  contador!:number;

  constructor( private store:Store<AppState> ){}

  ngOnInit(): void {
    this.store.select('contador').subscribe( contador => this.contador = contador);
  }

  reset(){
    this.store.dispatch( actions.reset());
  }

}
