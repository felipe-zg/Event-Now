import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar} from 'react-native';
import {useDispatch, useSelector,} from 'react-redux';
import Firebase from 'react-native-firebase';
import EmpresaDao from '../../../daos/empresaDao';
import ContaDao from '../../../daos/ContaDao';
import EventoDao from '../../../daos/eventoDao';
import EnderecoDao from '../../../daos/enderecoDao';
import DialogInput from 'react-native-dialog-input';

import {
    resetaEstadoDaListaDeEnderecos,
    resetaEstadoDaListaDeEventos,
    deslogar,
    resetarUid,
    resetaEmpresa,
    deletaEnderecoNaLista,
    resetarConta
} from '../../../actions';

import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../../animations/1309-smiley-stack.json';

upgrade = ()=>{
    Toast.show("Plano premium indisponível no momento");
}

restauraEstadosDaAplicacao=(dispatch)=>{
    dispatch(resetaEstadoDaListaDeEnderecos());
    dispatch(resetaEstadoDaListaDeEventos());
    dispatch(resetarUid());
    dispatch(resetaEmpresa());
    dispatch(resetarConta());
}

logout = async(navigation, dispatch)=>{
    Firebase.auth().signOut()
        .then(()=>{
            dispatch(deslogar());
            Toast.show('Logout efetuado com sucesso !');
            navigation.push("TelaMain");
            restauraEstadosDaAplicacao(dispatch);
        });
}

deletaConta = async(senha, empresa, conta, eventos, enderecos, navigation, dispatch)=>{
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
                    restauraEstadosDaAplicacao(dispatch);
                    navigation.push("TelaMain");
                });
      })
      .catch(()=>{
          Toast.show("Erro ao tentar reautenticar !");
      })
   
}

alertLogout = (navigation, dispatch)=>{
    Alert.alert(
        'Sair da  Conta',
        'Tem certeza que deseja sair ?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log("Logout cancelada"),
            style: 'cancel',
          },
          {text: 'Sair', onPress: () =>  logout(navigation, dispatch)},
        ],
        {cancelable: false},
      );
}

alertDeletaConta = (setAlertiSenhaVisible)=>{
    Alert.alert(
        'Excluir Conta',
        'Tem certeza que deseja excluir permanentemente a conta da sua empresa ?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log("exclusão cancelada"),
            style: 'cancel',
          },
          {text: 'Excluir', onPress: () =>  setAlertiSenhaVisible(true)},
        ],
        {cancelable: false},
      );
}

export default function Perfil({navigation}){
    const empresa = useSelector(state=> state.empresa.dados);
    const conta = useSelector(state=> state.conta.dados);
    const eventos = useSelector(state=>state.listaEventos.eventos);
    const enderecos = useSelector(state=>state.listaEnderecos.enderecos);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const [alertSenhaVisible, setAlertiSenhaVisible] = useState(false);

    return(
        <View> 
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            {alertSenhaVisible &&(
                <DialogInput isDialogVisible={alertSenhaVisible}
                    title={"Reautenticação"}
                    message={"Por questões de segurança precisamos que você digite sua senha atual"}
                    hintInput ={"Digite sua senha"}
                    submitInput={ (senha) => {
                        deletaConta(senha, empresa, conta, eventos, enderecos, navigation, dispatch);
                        etAlertiSenhaVisible(false)}
                    }
                    closeDialog={ () => {setAlertiSenhaVisible(false)}}>
                </DialogInput>
            )}
            {!alertSenhaVisible && !isLogged &&(
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            )}
            {!alertSenhaVisible && isLogged &&(
                <View>
                    <View style={styles.viewInformacoes}> 
                        <Text style={styles.txtInformacoes}>{empresa.nome}</Text>
                        <Text style={styles.txtInformacoes}>{empresa.cnpj}</Text>
                        <Text style={styles.txtInformacoes}>{empresa.email}</Text>
                    </View>
                    <View>
                        <View style={styles.viewMenus}>
                            <TouchableOpacity style={styles.touch} onPress={()=>upgrade()}>
                                <Text style={styles.txtUpgrade}>FAZER UPGRADE PARA O PLANO PREMIUM</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewMenus}>
                            <TouchableOpacity style={styles.touch} onPress={()=>navigation.push("TelaAttEmailEmpresa")}>
                                <Text style={styles.txtAtualizar}>ATUALIZAR E-MAIL</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewMenus}>
                            <TouchableOpacity style={styles.touch} onPress={()=>navigation.push("TelaAttSenhaEmpresa")}>
                                <Text style={styles.txtAtualizar}>ATUALIZAR SENHA</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewMenus}>
                            <TouchableOpacity style={styles.touch} onPress={()=>navigation.push("TelaPoliticaDePrivacidade")}>
                                <Text style={styles.txtPoliticaPrivacidade}>POLÍTICA DE PRIVACIDADE</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.viewMenus}>
                            <TouchableOpacity style={styles.touch} onPress={()=>alertDeletaConta(setAlertiSenhaVisible)}>
                                <Text style={styles.txtDeletar}>DELETAR CONTA</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewMenus}>
                            <TouchableOpacity style={styles.touch} onPress={()=>alertLogout(navigation, dispatch)}>
                                <Text style={styles.txtSair}>SAIR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    viewInformacoes:{
        alignItems: 'center',
        backgroundColor: '#612F74',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        marginBottom: 30,
        borderBottomWidth: 3,
        borderBottomColor: 'orange'
    },
    txtInformacoes:{
        color: '#fff',
        paddingVertical: 2,
        fontSize: 13
    },
    viewMenus:{
        alignItems: 'center',
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'grey'
    },
    txtSair:{
        color: 'orange',
        
    },
    txtAtualizar:{
        color: 'blue'
    },
    txtUpgrade:{
        color: 'green'
    },
    txtDeletar:{
        color: 'red'
    },
    txtPoliticaPrivacidade:{
        color: '#612F74'
    },
    touch:{
        paddingVertical: 7,
        width: '100%',
        alignItems: 'center'
    }
})

