import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';

// import { Container } from './styles';

export default function InformacoesProcessamento() {
    return (
        <View style={styles.view}>
            <Text style={styles.assunto}>Informações detalhadas sobre o processamento de dados pessoais</Text>
            <Text style={styles.paragrafo}>Os dados pessoais são recolhidos para os seguintes fins e utilizando 
                os seguintes serviços:</Text>

            <Text style={styles.subAssunto}>Contatar o usuário</Text>

            <Text style={styles.subAssunto3}>Lista de endereçamento ou boletim informativo (este aplicativo)</Text>
            <Text style={styles.paragrafo3}>Ao registar-se na lista de endereçamento ou no boletim informativo, o endereço 
                    de e-mail do usuário será adicionado à lista de contatos daqueles que podem receber mensagens de e-mail 
                    que contenham informações de natureza comercial ou promocional sobre este Aplicativo. O seu endereço de e-mail 
                    também poderá ser adicionado a esta lista, como resultado de sua inscrição neste serviço (este aplicativo).</Text>
            <Text style={styles.paragrafo3}>Dados pessoais coletados: e-mail.</Text>

            <Text style={styles.subAssunto3}>Formulário de contato (este aplicativo)</Text>
            <Text style={styles.paragrafo3}>Ao preencher o formulário de contato com os seus dados, os usuários autorizam este aplicativo 
                    a usar esses detalhes para responder aos pedidos de informações, cotação ou qualquer outro tipo de pedido como indicado 
                    pelo título do formulário.</Text>
            <Text style={styles.paragrafo3}>Dados pessoais coletados: e-mail, nome e sobrenome.</Text>


            <Text style={styles.subAssunto}>Informações adicionais sobre a coleta e processamento de dados</Text>

            <Text style={styles.subAssunto3}>Ação jurídica</Text>
            <Text style={styles.paragrafo3}>Os dados pessoais dos usuários podem ser utilizados para fins jurídicos pelo controlador de dados 
                    em juízo ou nas etapas conducentes à possível ação jurídica decorrente de uso indevido deste serviço (este aplicativo) ou dos 
                    serviços relacionados.</Text>
            <Text style={styles.paragrafo3}>O usuário declara estar ciente de que o controlador dos dados poderá ser obrigado a revelar os dados 
                    pessoais mediante solicitação das autoridades governamentais.</Text>

            <Text style={styles.subAssunto3}>Informações adicionais sobre os dados pessoais do usuário</Text>
            <Text style={styles.paragrafo3}>Além das informações contidas nesta política de privacidade, este aplicativo poderá fornecer 
                    ao usuário informações adicionais e contextuais sobre os serviços específicos ou a coleta e processamento de dados pessoais m
                    ediante solicitação.</Text>

            <Text style={styles.subAssunto3}>Logs do sistema e manutenção</Text>
            <Text style={styles.paragrafo3}>Para fins de operação e manutenção, este aplicativo e quaisquer serviços de terceiros poderão coletar 
                    arquivos que gravam a interação com este aplicativo (logs do sistema) ou usar, para este fim, outros dados Pessoais (tais como 
                    o endereço IP).</Text>

            <Text style={styles.subAssunto3}>As informações não contidas nesta política</Text>
            <Text style={styles.paragrafo3}>Mais detalhes sobre a coleta ou processamento de dados pessoais podem ser solicitados ao controlador
                     de dados, a qualquer momento. Favor ver as informações de contato no início deste documento.</Text>

            <Text style={styles.subAssunto3}>Os direitos dos usuários</Text>
            <Text style={styles.paragrafo3}>Os usuários têm o direito de, a qualquer tempo, consultar o controlador de dados para saber se os seus 
                    dados pessoais foram armazenados e saber mais sobre o conteúdo e origem, verificar a sua exatidão ou para pedir que sejam 
                    complementados, cancelados, atualizados ou corrigidos, ou que sejam transformados em formato anônimo ou bloquear quaisquer dados 
                    mantidos em violação da lei, bem como se opor ao seu tratamento por quaisquer todas as razões legítimas. Os pedidos devem ser 
                    enviados para o controlador de dados usando a informação de contato fornecida anteriormente.</Text>
            <Text style={styles.paragrafo3}>Este aplicativo não suporta pedidos de "Não me rastreie".</Text>
            <Text style={styles.paragrafo3}>Para determinar se qualquer um dos serviços de terceiros que utiliza honram solicitações de 
                    "Não me rastreie", por favor leia as p olíticas de privacidade.</Text>

            <Text style={styles.subAssunto3}>Mudanças nesta política de privacidade</Text>
            <Text style={styles.paragrafo3}>O controlador de dados se reserva o direito de fazer alterações nesta política de privacidade a qualquer 
                    momento, mediante comunicação aos seus usuários nesta página. É altamente recomendável que esta página seja consultada várias 
                    vezes em relação à última modificação descrita na parte inferior. Se o Usuário não concorda com qualquer das alterações da política 
                    de privacidade, o usuário deve cessar o uso deste serviço (este aplicativo) e pode solicitar ao controlador de dados que apague os 
                    dados pessoais dele. Salvo disposição em contrário, a atual política de privacidade se aplica a todos os dados pessoais dos usuários 
                    que o controlador de dados tiver.</Text>


            <Text style={styles.subAssunto}>Definições e referências jurídicas</Text>


            <Text style={styles.subAssunto3}>Dados pessoais (ou dados)</Text>
            <Text style={styles.paragrafo3}>Quaisquer informações relativas a uma pessoa física, pessoa jurídica, instituição ou associação, as quais 
                    sejam, ou possam ser identificadas, mesmo que indiretamente, por referência a quaisquer outras informações, incluindo um número 
                    de identificação pessoal.</Text>

            <Text style={styles.subAssunto3}>Dados de uso</Text>
            <Text style={styles.paragrafo3}>As informações coletadas automaticamente a partir deste serviço (ou serviços de terceiros contratados neste 
                    serviço (este aplicativo), que podem incluir: os endereços IP ou nomes de domínio dos computadores utilizados pelos usuários que 
                    utilizam este aplicativo, os endereços URI (Identificador Uniforme de Recurso), a data e hora do pedido, o método utilizado para 
                    submeter o pedido ao servidor, o tamanho do arquivo recebido em resposta, o código numérico que indica o status do servidor de 
                    resposta (resultado positivo, erro , etc.), o país de origem, as características do navegador e do sistema operacional utilizado 
                    pelo usuário, os vários detalhes de tempo por visita (por exemplo, o tempo gasto em cada página dentro do aplicativo) e os detalhes 
                    sobre o caminho seguido dentro da aplicação, com especial referência à sequência de páginas visitadas e outros parâmetros sobre o 
                    sistema operacional do dispositivo e/ou ambiente de TI do Usuário.</Text>

            <Text style={styles.subAssunto3}>Usuário</Text>
            <Text style={styles.paragrafo3}>A pessoa que usa este aplicativo que deverá coincidir com ou estar autorizada pelo titular dos dados a 
                    quem os dados pessoais se referem.</Text>

            <Text style={styles.subAssunto3}>Titular dos dados</Text>
            <Text style={styles.paragrafo3}>A pessoa jurídica ou física a quem os dados pessoais se referem.</Text>

            <Text style={styles.subAssunto3}>Processador de dados (ou supervisor de dados)</Text>
            <Text style={styles.paragrafo3}>A pessoa física, pessoa jurídica, a administração pública ou qualquer outro órgão, associação ou 
                    organização autorizada pelo controlador de dados para o processamento dos dados pessoais em conformidade com esta política 
                    de privacidade.</Text>

            <Text style={styles.subAssunto3}>Controlador de dados (ou proprietário)</Text>
            <Text style={styles.paragrafo3}>A pessoa física, pessoa jurídica, administração pública ou qualquer outra entidade, associação ou organização 
                    com direitos, também em conjunto com outro controlador dos dados, para tomar decisões sobre as finalidades e os métodos de 
                    processamento de dados pessoais e os meios utilizados, incluindo medidas de segurança relativas ao funcionamento e ao uso deste 
                    serviço. O controlador de dados, a menos que seja especificado de outra forma, é o proprietário deste serviço 
                    (este aplicativo).</Text>

            <Text style={styles.subAssunto3}>Este aplicativo</Text>
            <Text style={styles.paragrafo3}>A ferramenta de hardware ou software pela qual os dados pessoais do usuário são coletados.</Text>

            <Text style={styles.subAssunto3}>Cookie</Text>
            <Text style={styles.paragrafo3}>Pequenas unidades de dados armazenados no dispositivo do usuário.</Text>

            <Text style={styles.subAssunto3}>Informação jurídica</Text>
            <Text style={styles.paragrafo3}>Aviso aos usuários europeus: esta declaração de privacidade foi elaborada em cumprimento das obrigações 
                    nos termos do art. n.10 da Diretiva 95/46/CE, e de acordo com as disposições da Diretiva 2002/58/CE, tal como revisto pela Diretiva 
                    2009/136/CE, sobre o assunto de Cookies.</Text>
            <Text style={styles.paragrafo3}>Esta política de privacidade é apenas sobre este Aplicativo.</Text>

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
    },
    subAssunto3:{
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 2,
        marginBottom: 5,
        marginLeft: 20,
    },
    paragrafo3:{
        textAlign: 'justify',
        marginLeft: 20,
        marginTop: 5,
    }
});