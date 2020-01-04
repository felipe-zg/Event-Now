const ESTADO_INICIAL = {
    eventos :[]
}


const listaEventosDeHojeReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'POPULAR_LISTA_EVENTOS_DE_HOJE':
            action.payLoad.map(eventoAAdd=>{
                var deveAdicionar = true;
                state.eventos.map(evento=>{
                    if(evento.keyEvento == eventoAAdd.keyEvento) deveAdicionar = false;
                })
                if(deveAdicionar){
                    state = {...state, eventos: [...state.eventos, eventoAAdd]}
                }
            })
            return state;
        default:
            return state;
    }
}

export default listaEventosDeHojeReducer;