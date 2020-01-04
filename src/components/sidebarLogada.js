import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux'
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {IonsIcons} from 'react-native-vector-icons';
import Firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';



sair = (navigation)=>{
    Firebase.auth().signOut()
        .then(()=>{     
            Toast.show("Logout efetuado com sucesso");      
            navigation.push("TelaMain");
        })
        .catch(e=>Toast.show("Erro ao deslogaar"));
    }

export default sideBarLogada = (props)=>{
    const {navigation} = props;
    const usuario = useSelector(state => state.usuario.dados);
    return(
    <ScrollView>
        <View>
            <ImageBackground 
                source={require('../imagens/fundo_drawer.jpg')}
                style={{width: undefined, height: 150, padding: 16, paddingTop: 48}}
            >
                <Text style={styles.txtUsuario}>Olá, {usuario.nome} !</Text>
                <TouchableOpacity style={styles.viewSair} onPress={()=>sair(navigation)}>
                    <Text style={styles.linkSair}>Sair</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>

        <View style={StyleSheet.container} >
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtUsuario:{
        color: '#fff',
    },
    viewSair:{
        marginTop: 16,
        borderRadius: 4,
        width: 60,
    },
    linkSair:{
        color: 'rgba(255,255,255,.8)'
    }
})