const ESTADO_INICIAL = {
    categorias :[
        'Ao Vivo',
        'Bar',
        'Balada',
        'Cinema',
        'Restaurante',
        'Esporte',
        'Palestras'
    ]
}


const listaCategoriasReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'ADD_CATEGORIA':
            return state = {...state, categorias: [...state.categorias, action.payLoad]};
        default:
            return state;
    }
}

export default listaCategoriasReducer;