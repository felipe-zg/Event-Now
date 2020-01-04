import React from 'react';
import { ScrollView, StatusBar, Text,  StyleSheet } from 'react-native';
import TiposDeDados from './tipos_de_dados';
import ModoELocal from './modoELocal';
import UsoDeDados from './usoDeDados';
import InformacoesDeProcessamento from './informacoesProcessamento';

export default function PoliticaDePrivacidade() {
  return (
    <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#612F74" />
        <Text style={styles.titulo}>Politica de privacidade Event Now</Text>

        <TiposDeDados/>
        <ModoELocal/>
        <UsoDeDados/>
        <InformacoesDeProcessamento/>
        
        <Text style={styles.data}>Última atualização: 03 de janeiro de 2020</Text>
        <Text>Veja na web: https://loving-shannon-b86c52.netlify.com</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    titulo:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    data:{
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 10,
        marginVertical: 20,
    }
});