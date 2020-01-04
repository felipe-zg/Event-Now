import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';

// import { Container } from './styles';

export default function UsoDeDados() {
    return (
       
        <View style={styles.view}>
            <Text style={styles.assunto}>O Uso dos dados coletados</Text>
            <Text style={styles.paragrafo}>Os dados relativos ao usuário são coletados para permitir que o proprietário forneça os serviços, bem 
                        como para os seguintes propósitos: contatar o usuário, comentário de conteúdo e interação com redes sociais e plataformas 
                        externas.</Text>
            <Text style={styles.paragrafo}>Os dados pessoais utilizados para cada finalidade estão descrito nas seções específicas deste documento</Text>
        </View>
      
    );
}


const styles = StyleSheet.create({
    view:{
      padding: 10,
    },
    assunto:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    paragrafo:{
        textAlign: 'justify',
        marginLeft: 10,
        marginTop: 5,
    }
});