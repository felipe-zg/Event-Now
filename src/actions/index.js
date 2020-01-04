export const populaListaDeEnderecosAction = (itensDaLista)=>{
    return{
        type: 'POPULAR_LISTA',
        payLoad: itensDaLista,
    }
}

export const addEnderecoNaListaAction = (novoEndereco)=>{
    return{
        type: 'ADD_ENDERECO_NA_LISTA',
        payLoad: novoEndereco,
    }
}

export const attEnderecoNaLista = (endereco)=>{
    return{
        type: 'ATT_ENDERECO_NA_LISTA',
        payLoad: endereco,
    }
}

export const deletaEnderecoNaLista = (endereco)=>{
    return{
        type: 'DELETA_ENDERECO_NA_LISTA',
        payLoad: endereco,
    }
}

export const resetaEstadoDaListaDeEnderecos = ()=>{
    return{
        type: 'RESETA_ESTADO_DA_LISTA_DE_ENDERECOS',
    }
}

export const populaListaDeEventosAction = (itensDaLista)=>{
    return{
        type: 'POPULAR_LISTA_EVENTOS',
        payLoad: itensDaLista,
    }
}

export const addEventoNaListaAction = (novoEvento)=>{
    return{
        type: 'ADD_EVENTO_NA_LISTA',
        payLoad: novoEvento,
    }
}

export const atualizaEventoNaListaAction = (evento)=>{
    return{
        type: 'ATT_EVENTO_NA_LISTA',
        payLoad: evento,
    }
}

export const deletaEventoNaLista = (evento)=>{
    return{
        type: 'DELETA_EVENTO_NA_LISTA',
        payLoad: evento,
    }
}

export const resetaEstadoDaListaDeEventos = ()=>{
    return{
        type: 'RESETA_ESTADO_DA_LISTA_DE_EVENTOS',
    }
}

export const logar = ()=>{
    return{
        type: 'LOGAR',
    }
}

export const deslogar = ()=>{
    return{
        type: 'DESLOGAR',
    }
}

export const setarConta = (conta)=>{
    return{
        type: 'SETA_CONTA',
        payLoad: conta,
    }
}

export const resetarConta = ()=>{
    return{
        type: 'RESETA_CONTA',
    }
}

export const setarUid = (uId)=>{
    return{
        type: 'SETAR_UID',
        payLoad: uId,
    }
}
export const resetarUid = ()=>{
    return{
        type: 'RESETAR_UID',
    }
}

export const setaEmpresa = (empresa)=>{
    return{
        type: 'SETA_EMPRESA',
        payLoad: empresa
    }
}

export const resetaEmpresa = ()=>{
    return{
        type: 'RESETA_EMPRESA',
    }
}

export const populaListaDeEventosDeHoje = (eventos)=>{
    return{
        type: 'POPULAR_LISTA_EVENTOS_DE_HOJE',
        payLoad: eventos,
    }
}

export const setaUsuario = (usuario)=>{
    return{
        type: 'SETA_USUARIO',
        payLoad: usuario
    }
}

export const popularListaFavoritos = (listaFavoritos)=>{
    return{
        type: 'POPULAR_LISTA_FAVORITOS',
        payLoad: listaFavoritos,
    }
}

export const addFavoritoNaLista = (favorito)=>{
    return{
        type: 'ADD_FAVORITO_NA_LISTA',
        payLoad: favorito,
    }
}

export const deletarFavoritoDaLista = (favorito)=>{
    return{
        type: 'DELETA_FAVORITO_NA_LISTA',
        payLoad: favorito,
    }
}

export const resetaListaFavoritos = ()=>{
    return{
        type: 'RESETA_ESTADO_DA_LISTA_FAVORITOS',
    }
}