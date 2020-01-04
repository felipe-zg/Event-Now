import React,{useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import Firebase from 'react-native-firebase';
import {travaBtnAndroid} from '../helpers';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/loadingPrincipal.json';

import ContaDao from '../daos/ContaDao';
import EmpresaDao from '../daos/empresaDao';
import EnderecoDao from '../daos/enderecoDao';
import EventoDao from '../daos/eventoDao';
import UsuarioDao from '../daos/usuarioDao';

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
} from '../actions';


popoulaEventosDeHoje = (dispatch)=>{
    const date  = new Date();
    const hoje = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    EventoDao.buscaEventosPorData(hoje)
        .then(eventos=>{
            dispatch(populaListaDeEventosDeHoje(eventos));
        });
}

iniciaListaFavoritos = (keyListaFavoritos)=>{
    
}

verificaTipoDeConta = async(uId, navigation, dispatch, devePopularEventosDeHoje)=>{
    let conta = await ContaDao.buscaContaPeloUId(uId, navigation);
    dispatch(setarConta(conta));
    //retirar esse if após codar o reset do redux ao deletar conta
    /*if(conta == null){
        navigation.push("TelaMain");
    }*/
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

        navigation.push("TelaDashboard")
    }else if(conta.tipo=='USUARIO'){
        if(devePopularEventosDeHoje){
            popoulaEventosDeHoje(dispatch);
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

        navigation.push("TelaMainLogada");
    }
}



export default function loading({navigation}){

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", travaBtnAndroid);
    
        return () => {
          BackHandler.removeEventListener(
            "hardwareBackPress",
            travaBtnAndroid
          );
        };
      }, [travaBtnAndroid]);

    const eventosDeHoje = useSelector(state=>state.listaEventosDeHoje.eventos);
    const uId = useSelector(state=> state.uId);

    const dispatch = useDispatch();
    
    const usuarioLogado = Firebase.auth().currentUser;
    //Firebase.auth().signOut();
   
    if(usuarioLogado == null){
        if(eventosDeHoje.length == 0){
            popoulaEventosDeHoje(dispatch);
        }
        navigation.push("TelaMain");
    }
    if(usuarioLogado != null && uId==''){
        dispatch(setarUid(usuarioLogado.uid));
        dispatch(logar());
    }
    if(uId != ''){
        verificaTipoDeConta(uId, navigation, dispatch, 
            eventosDeHoje.length == 0? true: false);
    }

    return(
        <View style={styles.viewPrincipal}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            <View style={styles.viewAnimacao}>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </View>
            <Text style={styles.txt}>Aguarde, estamos preparando a festa pra você :)</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    viewPrincipal:{
        alignItems: 'center',
        backgroundColor: '#612F74',
        flex: 1,
        justifyContent: 'center'
    },
    viewAnimacao:{
        height: 200,
        width: 200,
        marginBottom: 100,
    },
    txt:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
    }
});