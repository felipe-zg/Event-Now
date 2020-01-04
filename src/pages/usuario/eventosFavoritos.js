import React from 'react';
import {ScrollView ,View, Text, TouchableOpacity, Image, StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';



export default function eventosFavoritos({navigation}){
    const favoritos = useSelector(state=>state.eventosFavoritos.eventos);
    
    return(
        <ScrollView>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            {favoritos.map(evento=>(
                <View key={Math.random(10)}>
                    <TouchableOpacity style={styles.viewEvento} key={evento.keyEvento} onPress={()=>navigation.navigate("TelaEvento", {evento})}>
                        <Image 
                            source={{ uri: evento.uriFoto}}
                            style={styles.foto} />
                        <Text style={{color: '#fff'}}>{evento.titulo}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewEvento:{
        height: 200,
        marginVertical: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#612F74',
        overflow: 'hidden',
    },
    foto:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
})

