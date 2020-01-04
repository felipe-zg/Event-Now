const ESTADO_INICIAL = {
    eventos :[]
}


const listaEventosEmpresaReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'POPULAR_LISTA_EVENTOS':
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
        case 'ADD_EVENTO_NA_LISTA':
            var deveAdicionar = true;
            state.eventos.map(evento=>{
                if(evento.keyEvento == action.payLoad.keyEvento) deveAdicionar = false;
            })
            if(deveAdicionar){
                return {...state, eventos: [...state.eventos, action.payLoad]}
            }else{
                return state;
            }
        case 'ATT_EVENTO_NA_LISTA':
                var estadoAtualizado = {
                    eventos: []
                }
                state.eventos.map(evento=>{
                    if(evento.keyEvento != action.payLoad.keyEvento){
                        estadoAtualizado.eventos = [...estadoAtualizado.eventos, evento];
                    }else{
                        estadoAtualizado.eventos = [...estadoAtualizado.eventos, action.payLoad];
                    }
                })
                return estadoAtualizado;
        case 'DELETA_EVENTO_NA_LISTA':
                var estadoComDelecao = {
                    eventos: []
                }
                state.eventos.map(evento=>{
                    if(evento.keyEvento != action.payLoad.keyEvento){
                        estadoComDelecao.eventos = [...estadoComDelecao.eventos, evento];
                    }
                })
                return estadoComDelecao;
        case 'RESETA_ESTADO_DA_LISTA_DE_EVENTOS':
                var estadoVazio = {
                    eventos: []
                }
                return estadoVazio;
        default:
            return state;
    }
}

export default listaEventosEmpresaReducer;