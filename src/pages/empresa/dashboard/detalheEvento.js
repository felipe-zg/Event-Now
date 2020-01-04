import React from 'react';
import {View, ScrollView, Text, Image, StyleSheet, Button, Alert, StatusBar} from 'react-native';
import EventoDao from '../../../daos/eventoDao';
import {deletaEventoNaLista} from '../../../actions';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';

vaiParaOFormAttEvento = (evento, navigation)=>{
    navigation.navigate("TelaFormAttEvento", {eventoAAtualizar: evento});
}

exibeDialogExcluir = (evento, navigation, dispatch)=>{
    Alert.alert(
        'Excluir evento',
        'Tem certeza que deseja excluir o evento ' + evento.titulo + " ?",
        [
          {
            text: 'Cancelar',
            onPress: () => console.log("exclusão cancelada"),
            style: 'cancel',
          },
          {text: 'Excluir', onPress: () => excluiEvento(evento, navigation, dispatch)},
        ],
        {cancelable: false},
      );
}

excluiEvento = (evento, navigation, dispatch)=>{
    EventoDao.deletaEvento(evento)
        .then(()=>{
            Toast.show('Evento excluido com sucesso');
            dispatch(deletaEventoNaLista(evento));
            navigation.pop(1);
        })
}


export default function detalheEvento({navigation}){
    const evento = navigation.getParam('evento');
    const endereco = navigation.getParam('endereco');
    const dispatch = useDispatch();

    return(
        <ScrollView>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            <View style={styles.viewEvento}>
                <Image 
                    source={{ uri: evento.uriFoto}}
                    style={styles.foto} />
            </View>

            <View style={styles.viewInfoPrincipal}>
                <Text style={styles.txtPrincipal}>Dados:</Text>

                <Text style={styles.txt}>{evento.titulo}</Text>
                <Text style={styles.txt}>{evento.data}  - às {evento.hora} horas</Text>
                <Text style={styles.txt}>{evento.categoria}  - R$ {evento.valIngresso}  </Text>
                <Text style={styles.txtLink}>{evento.linkIngresso}</Text>
            </View>

            <View style={styles.viewDescricao}> 
                <Text style={styles.txtPrincipal}>Descrição:</Text>
                <Text style={styles.txt}>{evento.descricao}</Text>
            </View>

            <View style={styles.viewEndereco}>
                <Text style={styles.txtPrincipal}>Endereço:</Text>
             
                <Text style={styles.txt}>{endereco.rua}, {endereco.numero}</Text>
                <Text style={styles.txt}>{endereco.bairro}</Text>
                <Text style={styles.txt}>{endereco.cidade}, {endereco.estado}  </Text>
                <Text style={styles.txt}>{endereco.cep}</Text>
          
            </View>

            <View style={styles.viewBotoes}>
                <View style={styles.viewBotao}>
                    <Button title="Excluir" color='red' onPress={()=>{exibeDialogExcluir(evento, navigation, dispatch)}} />
                </View>
                <View style={styles.viewBotao}>
                    <Button title="Editar" color='blue' onPress={()=>{vaiParaOFormAttEvento(evento, navigation)}} />
                </View>
            </View>
        </ScrollView>
    )
    
} 

const styles = StyleSheet.create({
    viewEvento:{
        height: 250,
        borderBottomWidth: 3,
        borderColor: '#612F74',
    },
    foto:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    txt:{
        alignSelf: 'center',
        fontSize: 14,
    },
    txtLink:{
        fontSize: 16,
        color: 'blue',
    },
    viewInfoPrincipal:{
        marginTop: 10,
        margin: 5,
        paddingHorizontal: 5,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#612F74',
        borderRadius: 5,
    },
    viewDescricao:{
        marginTop: 10,
        margin: 5,
        paddingHorizontal: 5,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#612F74',
        borderRadius: 5,
    },
    viewEndereco:{
        marginTop: 10,
        margin: 5,
        paddingHorizontal: 5,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#612F74',
        borderRadius: 5,
    },
    viewBotoes:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    viewBotao:{
        borderRadius: 20,
        width: '40%',
        overflow: 'hidden',
    }

})