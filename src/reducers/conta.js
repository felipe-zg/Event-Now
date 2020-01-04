const ESTADO_INICIAL = {
    dados :{}
}

const contsReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'SETA_CONTA':
            return {...state, dados: action.payLoad}
        case 'RESETA_CONTA':
            state.dados = {};
            return state.dados = {};;
        default:
            return state;
    }
}

export default contsReducer;