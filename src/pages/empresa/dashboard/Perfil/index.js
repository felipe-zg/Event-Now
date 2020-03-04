import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector,} from 'react-redux';
import Firebase from 'react-native-firebase';
import DialogInput from 'react-native-dialog-input';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';

import EmpresaDao from '../../../../daos/empresaDao';
import ContaDao from '../../../../daos/ContaDao';
import EventoDao from '../../../../daos/eventoDao';
import EnderecoDao from '../../../../daos/enderecoDao';
import loadingAnimated from '../../../../animations/1309-smiley-stack.json';

import {
    resetaEstadoDaListaDeEnderecos,
    resetaEstadoDaListaDeEventos,
    deslogar,
    resetarUid,
    resetaEmpresa,
    resetarConta
} from '../../../../actions';
import {
    Info,
    Informacao,
    MenuItem,
    MenuText
} from './styles';



export default function Perfil({navigation}){
    const empresa = useSelector(state=> state.empresa.dados);
    const conta = useSelector(state=> state.conta.dados);
    const eventos = useSelector(state=>state.listaEventos.eventos);
    const enderecos = useSelector(state=>state.listaEnderecos.enderecos);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const [alertSenhaVisible, setAlertSenhaVisible] = useState(false);

    function restauraEstadosDaAplicacao(){
        dispatch(resetaEstadoDaListaDeEnderecos());
        dispatch(resetaEstadoDaListaDeEventos());
        dispatch(resetarUid());
        dispatch(resetaEmpresa());
        dispatch(resetarConta());
    }

    function upgrade(){
        Toast.show("Plano premium indisponível no momento");
    }

    function alertDeletaConta(){
        Alert.alert(
            'Excluir Conta',
            'Tem certeza que deseja excluir permanentemente a conta da sua empresa ?',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log("exclusão cancelada"),
                style: 'cancel',
              },
              {text: 'Excluir', onPress: () =>  setAlertSenhaVisible(true)},
            ],
            {cancelable: false},
          );
    }

    async function deletaConta(senha){
        EmpresaDao.deletaEmpresa(empresa)
        ContaDao.deletaConta(conta)
    
        eventos.map(evento=>{
            EventoDao.deletaEvento(evento);
        });
    
        enderecos.map(endereco=>{
            EnderecoDao.deletaEndereco(endereco);
        });
    
        const usuario = Firebase.auth().currentUser;
            
        const credential = Firebase.auth.EmailAuthProvider.credential(
            usuario.email,
            senha
        );
    
        usuario.reauthenticateWithCredential(credential)
          .then(()=>{
                Firebase.auth().currentUser.delete()
                    .then(()=>{
                        dispatch(deslogar());
                        Toast.show("Conta deletada com sucesso");
                        restauraEstadosDaAplicacao();
                        navigation.replace("TelaMain");
                    });
          })
          .catch(()=>{
              Toast.show("Erro ao tentar reautenticar !");
          })
       
    }

    function alertLogout(){
        Alert.alert(
            'Sair da  Conta',
            'Tem certeza que deseja sair ?',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log("Logout cancelada"),
                style: 'cancel',
              },
              {text: 'Sair', onPress: () =>  logout()},
            ],
            {cancelable: false},
          );
    }

    async function logout(){
        Firebase.auth().signOut()
            .then(()=>{
                dispatch(deslogar());
                Toast.show('Logout efetuado com sucesso !');
                navigation.replace("TelaMain");
                restauraEstadosDaAplicacao();
            });
    }



    return(
        <View> 
            {alertSenhaVisible &&(
                <DialogInput isDialogVisible={alertSenhaVisible}
                    title={"Reautenticação"}
                    message={"Por questões de segurança precisamos que você digite sua senha atual"}
                    hintInput ={"Digite sua senha"}
                    submitInput={ (senha) => {
                        deletaConta(senha);
                        setAlertSenhaVisible(false)}
                    }
                    closeDialog={ () => {setAlertSenhaVisible(false)}}>
                </DialogInput>
            )}
            {!alertSenhaVisible && !isLogged &&(
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            )}
            {!alertSenhaVisible && isLogged &&(
                <View>
                    <Info> 
                        <Informacao> {empresa.nome} </Informacao>
                        <Informacao> {empresa.cnpj} </Informacao>
                        <Informacao> {empresa.email} </Informacao>
                    </Info>
                    <View>
                        <MenuItem onPress={()=>upgrade()}>
                            <MenuText color="#070"> fazer upgrade para plano premium </MenuText>
                        </MenuItem>
                        <MenuItem  onPress={()=>navigation.navigate("TelaAttEmailEmpresa")}>
                            <MenuText color="#00f"> atualizar e-mail </MenuText>
                        </MenuItem>
                        <MenuItem onPress={()=>navigation.navigate("TelaAttSenhaEmpresa")}>
                            <MenuText color="#00f"> atualizar senha </MenuText>
                        </MenuItem>
                        <MenuItem onPress={()=>navigation.navigate("TelaPoliticaDePrivacidade")}>
                            <MenuText color="#612F74"> política de privacidade </MenuText>
                        </MenuItem>
                        <MenuItem onPress={()=>alertDeletaConta()}>
                            <MenuText color="#f00"> deletar conta </MenuText>
                        </MenuItem>
                        <MenuItem onPress={()=>alertLogout()}>
                            <MenuText color="#f00"> sair </MenuText>
                        </MenuItem>
                    </View>
                </View>
            )}
        </View>
    )
}



