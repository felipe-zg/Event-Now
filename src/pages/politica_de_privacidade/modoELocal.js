import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function ModoELocal() {
  return (
  
    <View style={styles.view}>
        <Text style={styles.assunto}>Modo e local de processamento dos dados</Text>

        <Text style={styles.subAssunto}>Método de processamento</Text>
        <Text style={styles.paragrafo}>O controlador de dados processa os dados de usuários de forma adequada e tomará as medidas de segurança 
                adequadas para impedir o acesso não autorizado, divulgação, alteração ou destruição não autorizada dos dados.</Text>
        <Text style={styles.paragrafo}>O processamento de dados é realizado utilizando computadores e /ou ferramentas de TI habilitadas, 
                seguindo procedimentos organizacionais e meios estritamente relacionados com os fins indicados. Além do controlador de 
                dados, em alguns casos, os dados podem ser acessados por certos tipos de pessoas envolvidas com a operação do aplicativo 
                (administração, vendas, marketing, administração legal do sistema) ou pessoas externas (como fornecedores terceirizados de 
                serviços técnicos, carteiros, provedores de hospedagem, empresas de TI, agências de comunicação) nomeadas, quando necessário, 
                como processadores de dados por parte do proprietário. A lista atualizada destas partes pode ser solicitada a partir do 
                controlador de dados a qualquer momento.</Text>

        <Text style={styles.subAssunto}>Lugar</Text>
        <Text style={styles.paragrafo}>Os dados são processados nas sedes de operação do controlador de dados, e em quaisquer outros lugares 
                onde as partes envolvidas com o processamento estejam localizadas. Para mais informações, por favor entre em contato com o 
                controlador de dados.</Text>

        <Text style={styles.subAssunto}>Período de conservação</Text>
        <Text style={styles.paragrafo}>Os dados são mantidos pelo período necessário para prestar o serviço solicitado pelo usuário, ou 
                pelos fins descritos neste documento, e o usuário pode solicitar ao controlador de dados para que os suspendam ou os removam.</Text>
    
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
    subAssunto:{
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },
    paragrafo:{
        textAlign: 'justify',
        marginLeft: 10,
        marginTop: 5,
    }
});
