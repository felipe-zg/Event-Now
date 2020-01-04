import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function politica_de_privacidade() {
    //BLOCO DE TIPOS DE DADOS COLETADOS
  return (
    <View style={styles.view}>
      <Text style={styles.assunto}>Tipos de dados coletados</Text>
      <Text style={styles.paragrafo}>Entre os tipos de dados pessoais que este aplicativo recolhe, 
          por si só ou por meio de terceiros, estão: e-mail, nome, sobrenome, cookies e dados de uso. </Text>
      <Text style={styles.paragrafo}>Outros dados pessoais recolhidos podem ser descritos em outras seções desta política
            de privacidade ou pelo texto explicativo específico apresentado no contexto da coleta de dados. </Text>
      <Text style={styles.paragrafo}>Os dados pessoais podem ser livremente fornecidos pelo usuário, ou coletados a
            utomaticamente quando se utiliza este aplicativo. </Text>
      <Text style={styles.paragrafo}>Qualquer uso de cookies - ou de outras ferramentas de rastreamento - pelo aplicativo ou pelos propr
          ietários dos serviços terceirizados u tilizados por ele, salvo indicação em contrário, servem para identificar os usuários e l
          embrar as suas preferências, com o único propósito de fornecer os serviços requeridos por eles. </Text>
      <Text style={styles.paragrafo}>O não fornecimento de determinados dados pessoais pode tornar impossível para este 
          aplicativo prestar os seus serviços. </Text>
      <Text style={styles.paragrafo}>O usuário assume a responsabilidade pelos dados pessoais de terceiros publicados ou compartilhados 
          por meio deste serviço (este aplicativo) e confirma que tem o consentimento da parte terceira para fornecer dados para o 
          proprietário. </Text>
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
