import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {IonsIcons} from 'react-native-vector-icons';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/drawer.json';

export default sideBar = props=>(
    <ScrollView>
        <View>
            <ImageBackground 
                source={require('../imagens/fundo_drawer.jpg')}
                style={styles.ImageBackground}
            >
                <View style={styles.viewAnimation}>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
                <Text style={styles.txtPrincipal}>Olá, bem-vindo(a) ao Event Now !</Text>
            </ImageBackground>
        </View>

        <View style={StyleSheet.container} >
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageBackground:{
        width: undefined, 
        padding: 16, 
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtPrincipal:{
        color: '#fff',
        fontSize: 12
    },
    viewAnimation:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },
})