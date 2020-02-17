import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, Picker, StatusBar} from 'react-native';
import Firebase from 'react-native-firebase';
import EnderecoDao from '../../daos/enderecoDao';
import Geocoder from 'react-native-geocoding';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../animations/form_loading.json';
import Toast from 'react-native-root-toast';
import {GOOGLE_MAPS_APIKEY} from '../../configs';

export default class CadastroEndereco extends Component{
    constructor(){
        super();
        this.state={
            endereco:{
                rua: '',
                bairro:'',
                cep: '',
                numero: '',
                cidade: '',
                estado:'RJ',
                latitude: '',
                longitude: '',
                keyEndereco:'',
                uIdEmpresa: ''
            },
            UFs: ['RJ', 'SP', 'MG', 'ES'],
            isLoading: false,
        }
    }

    componentDidMount(){
        const usuarioLogado = Firebase.auth().currentUser;
        if(usuarioLogado != null)
            this.alteraEstado("uIdEmpresa", usuarioLogado.uid);
    }

    alteraEstado = (campo, valor)=>{
        const { endereco } = { ...this.state };
        const estadoAtual = endereco;

        estadoAtual[campo] = valor;
      
        this.setState({ endereco: estadoAtual });
    }

    realizaCadastro = async()=>{
        const {endereco} = this.state;
        if(this.formularioPossuiCampoVazio()){
            console.warn("todos os campos são obrigatórios");
            return;
        }
        this.setState({isLoading: true});
        const enderecoMaps = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro} - ${endereco.cidade}, ${endereco.estado}`
        Geocoder.init(GOOGLE_MAPS_APIKEY); 
        Geocoder.from(enderecoMaps)
            .then(json => {
                var location = json.results[0].geometry.location;
                endereco.latitude = location.lat;
                endereco.longitude = location.lng;
                EnderecoDao.salvaEndereco(endereco);
                this.setState({isLoading: false});
                this.props.navigation.push('TelaDashboard');
            })
            .catch(error => {
                Toast.show("Endereço não existe");
                this.setState({isLoading: true});
                return;
            });    
    }

    formularioPossuiCampoVazio = ()=>{
        const {endereco} = this.state;
        if(endereco.rua=='' || endereco.bairro=='' || endereco.cep=='' || endereco.numero=='' || endereco.cidade=='' || endereco.estado=='' )
            return true;
        return false;
    }

    renderizaUFs = ()=>{
        return this.state.UFs.map((uf) => {
            return (
                <Picker.Item key={uf} label={uf} value={uf} />
            )
          })
    }

    formTemCampoVazio = (endereco)=>{
        if(endereco.rua =='' || endereco.numero =='' || endereco.bairro =='' || endereco.cep =='' || endereco.cidade =='' || endereco.estado ==''){
            return true;
        }else{
            return false;
        }
    }
    
    formatoDoCepEhValido = (cep)=>{
        if(cep.length < 8){
            return false
        }else{
            return true;
        }
    }
    
    //VERIFICA A LÓGICA DESSA FUNÇÃO QUANTO VOLTAR A INICIAR O APP DESDE O PRINCIPIO NA TELA DE CADASTRO
    handlerNumberInput = (campo, valor)=>{
        const char = valor.charAt(valor.length-1)
        if(!isNaN(parseFloat(char)) && isFinite(char)){
            this.alteraEstado(campo, valor);
        }
        if(char.length == 0) this.setState(campo, '');
    }


    render(){
        const {endereco, isLoading} = this.state;
        if(isLoading){
            return(
                <View style={styles.viewLoading}>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
            )
        }else{
            return(
                <ScrollView>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    <Text style={styles.txtPrincipal}>Cadastre o endereço principal da empresa</Text>
                    <View style={styles.viewForm}>
                        <TextInput style={styles.input}  placeholder="Rua" value={endereco.rua} onChangeText={rua=>this.alteraEstado("rua", rua)}/>
                        <TextInput style={styles.input}  placeholder="Bairro" value={endereco.bairro} onChangeText={bairro=>this.alteraEstado("bairro", bairro)}/>
                        <View style={styles.viewFlexRow}>
                            <TextInput style={styles.inputCep} maxLength={8} keyboardType='number-pad' placeholder="CEP" value={endereco.cep} onChangeText={cep=>this.handlerNumberInput("cep", cep)}/>
                            <TextInput style={styles.inputNumero} maxLength={6} keyboardType='number-pad'  placeholder="Número" value={endereco.numero} onChangeText={numero=>this.handlerNumberInput("numero", numero)}/>
                        </View>
                        <View style={styles.viewFlexRow}>
                            <TextInput style={styles.inputCidade}  placeholder="Cidade" value={endereco.cidade} onChangeText={cidade=>this.alteraEstado("cidade", cidade)}/>
                            <View style={styles.viewPicker}>
                                <Picker
                                    selectedValue={this.state.endereco.estado}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.alteraEstado("estado", itemValue)
                                    }>
                                    {this.renderizaUFs()}
                                
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.viewBotao}>
                            <Button title="Cadastrar" color="#612F74" onPress={()=>this.realizaCadastro()} />
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    txtPrincipal:{
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20
    },
    viewForm:{
        margin: 15,
        marginTop: 50,
        overflow: 'hidden'
    },
    input:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    viewBotao:{
        marginTop: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },
    viewFlexRow:{
        flexDirection: 'row',
    },
    inputCep:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    inputNumero:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '26%',
    },
    inputCidade:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    picker:{
        height: 50, 
        width: '100%',
    },
    viewPicker:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '26%',
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})