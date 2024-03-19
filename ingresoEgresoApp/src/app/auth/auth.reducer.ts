import { Usuario } from '../models/usuario.model';
import { setUser, unsetUser } from './auth.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
    user: Usuario | null;
}

export const initialState: State = {
   user: null,
}

export const authReducer = createReducer(initialState,

    on(setUser, (state,{user}) => ({ ...state, user: {...user}})),
    on(unsetUser, state => ({ ...state, user: null})),

);

