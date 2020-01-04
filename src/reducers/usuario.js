const ESTADO_INICIAL = {
    dados :{}
}

const usuarioReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'SETA_USUARIO':
            return {...state, dados: action.payLoad}
        case 'RESETA_USUARIO':
            state.dados = {};
            return state.dados = {};;
        default:
            return state;
    }
}

export default usuarioReducer;