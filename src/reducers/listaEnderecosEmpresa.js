const ESTADO_INICIAL = {
    enderecos :[]
}


const listaEnderecosEmpresaReducer = (state = ESTADO_INICIAL, action)=>{
    switch(action.type){
        case 'POPULAR_LISTA':
            action.payLoad.map(enderecoAAdd=>{
                var deveAdicionar = true;
                state.enderecos.map(endereco=>{
                    if(endereco.keyEndereco == enderecoAAdd.keyEndereco) deveAdicionar = false;
                })
                if(deveAdicionar){
                    state = {...state, enderecos: [...state.enderecos, enderecoAAdd]}
                }
            })
            return state;
        case 'ADD_ENDERECO_NA_LISTA':
            return {...state, enderecos: [...state.enderecos, action.payLoad]}
        case 'ATT_ENDERECO_NA_LISTA':
            let novoEstado = {
                enderecos :[]
            }            
            state.enderecos.map(endereco=>{
                if(endereco.keyEndereco != action.payLoad.keyEndereco){
                    novoEstado.enderecos = [...novoEstado.enderecos, endereco];
                }else{
                    novoEstado.enderecos = [...novoEstado.enderecos, action.payLoad];
                }
            })
            return novoEstado;
        case 'DELETA_ENDERECO_NA_LISTA':
            let estadoTemp = {
                enderecos :[]
            }            
            state.enderecos.map(endereco=>{
                if(endereco.keyEndereco != action.payLoad.keyEndereco){
                    estadoTemp.enderecos = [...estadoTemp.enderecos, endereco];
                }
            })
            return estadoTemp;
        case 'RESETA_ESTADO_DA_LISTA_DE_ENDERECOS':
            var estadoVazio = {
                enderecos: []
            }
            return estadoVazio;
        default:
            return state;
    }
}

export default listaEnderecosEmpresaReducer;