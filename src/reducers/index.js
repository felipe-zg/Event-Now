import {combineReducers} from 'redux';

import listaEnderecosEmpresaReducer from './listaEnderecosEmpresa';
import isLoggedReducer from './isLogged';
import uIdReducer from './uid';
import empresaReducer from './empresa';
import listaCategoriasReducer from './categorias';
import listaEventosEmpresaReducer from './eventosEmpresa';
import listaEventosDeHojeReducer from './eventosDeHoje';
import usuarioReducer from './usuario';
import eventosFavoritosReducer from './eventosFavoritos';
import contaReducer from './conta';

const allReducers = combineReducers({
    listaEnderecos : listaEnderecosEmpresaReducer,
    listaEventos: listaEventosEmpresaReducer,
    isLogged: isLoggedReducer,
    uId: uIdReducer,
    empresa: empresaReducer,
    listaCategorias: listaCategoriasReducer,
    listaEventosDeHoje: listaEventosDeHojeReducer,
    usuario: usuarioReducer,
    conta: contaReducer,
    eventosFavoritos: eventosFavoritosReducer,
});


export default allReducers;