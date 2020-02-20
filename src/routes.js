import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Dimensions} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {View} from 'react-native';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import TelaMain from './pages/App/Main';
import TelaLogin from './pages/App/Login';
import TelaCadastro from './pages/App/Cadastro';
import TelaRecuperarSenha from './pages/App/RecuperarSenha';

import TabPerfil from './pages/empresa/dashboard/perfil';
import TabEventos from './pages/empresa/dashboard/eventos';
import TabFormEventos from './pages/empresa/dashboard/formEvento';
import TabEnderecos from './pages/empresa/dashboard/enderecos';
import TabFormEnderecos from './pages/empresa/dashboard/formEndereco';

import TelaCadastroEmpresa from './pages/empresa/cadastro';
import TelaCadastroEndereco from './pages/empresa/cadastroEndereco';
import TelaAttSenhaEmpresa from './pages/empresa/attSenha';
import TelaAttEmailEmpresa from './pages/empresa/attEmail';

import TelaDetalheEventoEmpresa from './pages/empresa/dashboard/detalheEvento';
import TelaLoading from './pages/loading';

import TelaFormAttEvento from './pages/empresa/formAttEvento';
import TelaFormAttEndereco from './pages/empresa/formAttEndereco';

import Sidebar from './components/sideBar';
import SidebarLogada from './components/sidebarLogada';



import TelaEvento from './pages/App/Evento';
import TelaProcurarEventos from './pages/procurarEvento';
import TelaPoliticaDePrivacidade from './pages/politica_de_privacidade';
import TelaContato from './pages/App/Contato';
import TelaEventosFavoritos from './pages/usuario/eventosFavoritos';

const drawerPrincipalLogado = createDrawerNavigator({
        Main:{
            screen: TelaMain,
            navigationOptions:{
                drawerLabel: 'Home',
            }
        },
        ProcurarEventos:{
            screen: TelaProcurarEventos,
            navigationOptions:{
                drawerLabel: 'Procurar eventos',
            }
        },
        EventosFavoritos:{
            screen: TelaEventosFavoritos,
            navigationOptions:{
                drawerLabel: 'Eventos favoritos',
            }
        },
        Contato:{
            screen: TelaContato,
            navigationOptions:{
                drawerLabel: 'Fale conosco',
            }
        },
        PoliticaDePrivacidade:{
            screen: TelaPoliticaDePrivacidade,
            navigationOptions:{
                drawerLabel: 'Política de privacidade',
            }
        },
    },{
        contentComponent: props=><SidebarLogada {...props} />,
        drawerWidth: Dimensions.get('window').width * 0.85,
        hideStatusBar: true,
        initialRouteName: "Main",
        contentOptions:{
            activeBackgroundColor: '#612F74',
            activeTintColor: '#fff',
            inactiveTintColor: '#612F74',
            itemsContainerStyle:{
                marginTop: 16,
                marginHorizontal: 6,
            },
            itemStyle:{
                borderRadius: 4,
            }
        },
        drawerPosition: "left",
    }
)

const drawerPrincipal = createDrawerNavigator(
    {
        Main:{
            screen: TelaMain,
            navigationOptions:{
                drawerLabel: 'Home',
            }
        },
        ProcurarEventos:{
            screen: TelaProcurarEventos,
            navigationOptions:{
                drawerLabel: 'Procurar eventos',
            }
        },
        Login:{
            screen: TelaLogin,
            navigationOptions:{
                drawerLabel: 'Entrar',
            }
        },
        CadastroEmpresa:{
            screen: TelaCadastroEmpresa,
            navigationOptions:{
                drawerLabel: 'Cadastrar empresa',
            }
        },
        CadastroUsuario:{
            screen: TelaCadastro,
            navigationOptions:{
                drawerLabel: 'Cadastrar usuário',
            }
        },
        Contato:{
            screen: TelaContato,
            navigationOptions:{
                drawerLabel: 'Fale conosco',
            }
        },
        PoliticaDePrivacidade:{
            screen: TelaPoliticaDePrivacidade,
            navigationOptions:{
                drawerLabel: 'Política de privacidade',
            }
        },
    },{
        contentComponent: props=><Sidebar {...props} />,
        drawerWidth: Dimensions.get('window').width * 0.85,
        hideStatusBar: true,
        initialRouteName: "Main",
        contentOptions:{
            activeBackgroundColor: '#612F74',
            activeTintColor: '#fff',
            inactiveTintColor: '#612F74',
            itemsContainerStyle:{
                marginTop: 16,
                marginHorizontal: 6,
            },
            itemStyle:{
                borderRadius: 4,
            }
        },
        drawerPosition: "left",
    }
    
)


const TabTelaEventos = createMaterialTopTabNavigator (
    {
        TabEventos:{
            screen: TabEventos,
            navigationOptions:{
                tabBarLabel: "Meus eventos",
            }
        },
        TabNovoEvento:{
            screen: TabFormEventos,
            navigationOptions:{
                tabBarLabel: "Novo evento",
            },
        },
        
    },
    {
        initialRouteName: 'TabEventos',
        swipeEnabled: false,
        tabBarOptions:{
            activeTintColor: '#612F74',
            inactiveTintColor: '#ddd',
            style:{
                backgroundColor: '#fff',
                borderBottomWidth: 0.5,
                borderBottomColor: '#612F74'
            },
            indicatorStyle:{
                height: 0
            },
            labelStyle:{
                fontSize: 10
            }
        },
        
    },
)

const TabTelaEnderecos = createMaterialTopTabNavigator (
    {
        TabEnderecos:{
            screen: TabEnderecos,
            navigationOptions:{
                tabBarLabel: "Meus endereços",
              
            }
        },
        TabNovoEndereco:{
            screen: TabFormEnderecos,
            navigationOptions:{
                tabBarLabel: "Novo endereço",
              
            }
        },
        
    },
    {
        initialRouteName: 'TabEnderecos',
        swipeEnabled: false,
        tabBarOptions:{
            activeTintColor: '#612F74',
            inactiveTintColor: '#ddd',
            style:{
                backgroundColor: '#fff',
                borderBottomWidth: 0.5,
                borderBottomColor: '#612F74'
            },
            indicatorStyle:{
                height: 0
            },
            labelStyle:{
                fontSize: 10
            }
        }
    }
)

const tabsDashboard = createMaterialBottomTabNavigator(
    {
        TabEventos:{
            screen: TabTelaEventos,
            navigationOptions:{
                tabBarLabel: "Meus eventos",
                tabBarIcon:  <Ionicons name="md-calendar" size={30} color="#612F74" />
            }
        },
        TabEnderecos:{
            screen: TabTelaEnderecos,
            navigationOptions:{
                tabBarLabel: "Meus endereços",
                tabBarIcon:  <EntypoIcon name="address" size={30} color="#612F74" />
            }
        },
        TabPerfil:{
            screen: TabPerfil,
            navigationOptions:{
                tabBarLabel: "Perfil",
                tabBarIcon: <Ionicons name="ios-home" size={30} color="#612F74" />
            }
        },
    },
    {
        initialRouteName: 'TabEventos',
        activeColor: '#612F74', 
        inactiveColor: '#3e2465',  
        barStyle: { 
            backgroundColor: '#fff',
        },
        shifting: true,
        swipeEnabled: true,
    }
);


const Routes = createAppContainer(
    createStackNavigator(
        {
            TelaLoading:{
                screen: TelaLoading,
                navigationOptions:{
                    title: "Event Now",
                    headerLeft: null,
                }
            },
            TelaEvento:{
                screen: TelaEvento,
                navigationOptions:{
                    title: 'Event now',
                }
            },
            TelaDashboard: {
                screen: tabsDashboard,
                navigationOptions:{
                    title: "Dashboard",
                    headerLeft: null,
                }
            },
            TelaDetalheEventoEmpresa:{
                screen: TelaDetalheEventoEmpresa,
                navigationOptions:{
                    title: "Detalhes do evento",
                }
            },

            TelaMain: {
                screen: drawerPrincipal,
                navigationOptions:({navigation})=>({
                    title: "Event Now",
                    headerRight: () => (
                        <View >
                            <FontawesomeIcon name="bars"color="#fff" size={35} onPress={()=>navigation.openDrawer()}/>
                        </View>
                    ),
                    headerRightContainerStyle:{
                        marginHorizontal: 8,
                    },
                    headerLeft: null,
                })
            },
            TelaMainLogada:{
                screen: drawerPrincipalLogado,
                navigationOptions:({navigation})=>({
                    title: "Event Now",
                    headerRight: () => (
                        <View >
                            <FontawesomeIcon name="bars"color="#fff" size={35} onPress={()=>navigation.openDrawer()}/>
                        </View>
                    ),
                    headerRightContainerStyle:{
                        marginHorizontal: 8,
                    },
                    headerLeft: null,
                })
            },
            TelaCadastroEmpresa: {
                screen: TelaCadastroEmpresa,
                navigationOptions:{
                    title: "Cadastro",
                }
            },
            TelaCadastroEndereco: {
                screen: TelaCadastroEndereco,
                navigationOptions:{
                    title: "Cadastro de endereço",
                    headerLeft: null,
                }
            },
            TelaLogin: {
                screen: TelaLogin,
                navigationOptions:{
                    title: "Login",
                    headerLeft: null,
                }
            },
            TelaCadastro: {
                screen: TelaCadastro,
                navigationOptions:{
                    title: "Cadastro",
                }
            },
            TelaRecuperarSenha: {
                screen: TelaRecuperarSenha,
                navigationOptions:{
                    title: "Recuperar senha",
                }
            },
            TelaFormAttEvento: {
                screen: TelaFormAttEvento,
                navigationOptions:{
                    title: "Atualizar evento",
                }
            },
            TelaFormAttEndereco: {
                screen: TelaFormAttEndereco,
                navigationOptions:{
                    title: "Atualizar endereço",
                }
            },
            TelaAttSenhaEmpresa: {
                screen: TelaAttSenhaEmpresa,
                navigationOptions:{
                    title: "Atualizar Senha",
                }
            },
            TelaAttEmailEmpresa: {
                screen: TelaAttEmailEmpresa,
                navigationOptions:{
                    title: "Atualizar e-mail",
                }
            },
            TelaPoliticaDePrivacidade: {
                screen: TelaPoliticaDePrivacidade,
                navigationOptions:{
                    title: "Política De Privacidade",
                }
            },
        },
        {
            defaultNavigationOptions:{
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor:'#612F74',
                },
            },
        },
        {
            initialRouteName: "TelaCadastroEmpresa",
        }
    )
);

export default Routes;