const ESTADO_INICIAL = {
    eventos :[]
}


const eventosFavoritosReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'POPULAR_LISTA_FAVORITOS':
            action.payLoad.map(evento=>{
                state = {...state, eventos: [...state.eventos, evento]}
            })
            return state;
        case 'ADD_FAVORITO_NA_LISTA':
            var deveAdicionar = true;
            state.eventos.map(evento=>{
                if(evento.keyEvento == action.payLoad.keyEvento) deveAdicionar = false;
            })
            if(deveAdicionar){
                return {...state, eventos: [...state.eventos, action.payLoad]}
            }else{
                return state;
            }
        case 'DELETA_FAVORITO_NA_LISTA':
            let estadoTemp = {
                eventos :[]
            }            
            state.eventos.map(evento=>{
                if(evento.keyEvento != action.payLoad.keyEvento){
                    estadoTemp.eventos = [...estadoTemp.eventos, evento];
                }
            })
            return estadoTemp;
        case 'RESETA_ESTADO_DA_LISTA_FAVORITOS':
            var estadoVazio = {
                eventos: []
            }
            return estadoVazio;
        default:
            return state;
    }
}

export default eventosFavoritosReducer;