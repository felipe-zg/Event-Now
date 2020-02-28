import React,{useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import Firebase from 'react-native-firebase';
import Lottie from 'lottie-react-native';

import loadingAnimated from '../../../animations/loadingPrincipal.json';
import ContaDao from '../../../daos/ContaDao';
import EmpresaDao from '../../../daos/empresaDao';
import EnderecoDao from '../../../daos/enderecoDao';
import EventoDao from '../../../daos/eventoDao';
import UsuarioDao from '../../../daos/usuarioDao';

import {
    populaListaDeEventosAction,
    populaListaDeEnderecosAction,
    setaEmpresa,
    setarUid,
    logar,
    populaListaDeEventosDeHoje,
    setaUsuario,
    addFavoritoNaLista,
    popularListaFavoritos,
    setarConta,
    resetarConta
} from '../../../actions';

import {
    Container,
    Animacao,
    Texto
} from './styles';


export default function loading({navigation}){
    const eventosDeHoje = useSelector(state=>state.listaEventosDeHoje.eventos);
    const uId = useSelector(state=> state.uId);
    const dispatch = useDispatch();
    const [usuarioLogado, setUsuarioLogado] = useState(Firebase.auth().currentUser);

    useEffect(() => {
        if(usuarioLogado == null){
            if(eventosDeHoje.length == 0){
                popoulaEventosDeHoje();
            }
            navigation.replace("TelaMain");
        }
        if(usuarioLogado != null && uId==''){
            dispatch(setarUid(usuarioLogado.uid));
            dispatch(logar());
        }
        if(uId != ''){
            verificaTipoDeConta();
        }
    }, [usuarioLogado, uId]);

    async function verificaTipoDeConta(){
        let conta = await ContaDao.buscaContaPeloUId(uId, navigation);
        dispatch(setarConta(conta));

        if(conta.tipo=='EMPRESA'){
            //BUSCA EMPRESA E SETA REDUX
            await EmpresaDao.buscaEmpresaPeloId(uId).then(empresa=>{
                dispatch(setaEmpresa(empresa));
            });
            //BUSCA ENDERECOS E SETA REDUX
            await EnderecoDao.listaEnderecos(uId).then(enderecos=>{
                dispatch(populaListaDeEnderecosAction(enderecos));
            });
            //buscar eventos
            await EventoDao.buscaEventosDaEmpresaPeloUId(uId).then(eventos=>{
                dispatch(populaListaDeEventosAction(eventos));
            });
    
            navigation.replace("TelaDashboard");
        }else if(conta.tipo=='USUARIO'){
            if(eventosDeHoje.length == 0){
                popoulaEventosDeHoje();
            }
            dispatch(logar());
            await UsuarioDao.buscaUsuarioPeloUId(uId).then(usuario=>{
                dispatch(setaUsuario(usuario));
                UsuarioDao.listaDeKeysEventosFavoritos(usuario.keyListaFavoritos)
                    .then(keys=>{
                        keys.map(key=>{
                            EventoDao.buscaEventoPelaKey(key.keyFavorito)
                                .then(evento=> dispatch(addFavoritoNaLista(evento)));
                        });
                    });
                
            });
    
            navigation.replace("TelaMainLogada");
        }
    }

    function popoulaEventosDeHoje(){
        const date  = new Date();
        const hoje = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
        EventoDao.buscaEventosPorData(hoje)
            .then(eventos=>{
                dispatch(populaListaDeEventosDeHoje(eventos));
            });
    }

    return(
        <Container>
            <Animacao>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </Animacao>
            <Texto>Aguarde, estamos preparando a festa pra você :)</Texto>
        </Container> 
    )
}
