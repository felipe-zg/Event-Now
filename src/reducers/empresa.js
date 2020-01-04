const ESTADO_INICIAL = {
    dados :{}
}

const listaEnderecosEmpresaReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'SETA_EMPRESA':
            return {...state, dados: action.payLoad}
        case 'RESETA_EMPRESA':
            state.dados = {};
            return state.dados = {};;
        default:
            return state;
    }
}

export default listaEnderecosEmpresaReducer;