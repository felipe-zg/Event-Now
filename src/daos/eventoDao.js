import Firebase from 'react-native-firebase';
import {converteDataFirebaseParaDate, dataEventoEhMaiorOuIgualAHoje} from '../helpers';

export default class EventoDao{

    static insereEventoERetornaKey = async()=>{
        const database = Firebase.database();
        try{
            const key = await database.ref("eventos").push().key;
            return key;
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static salvaEvento = async(evento)=>{
        const database = Firebase.database();
        try{
            await database.ref("eventos").child(evento.keyEvento).set(evento);
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static deletaEvento = async(evento)=>{
        const database = Firebase.database();
        try{
            await database.ref("eventos").child(evento.keyEvento).remove();
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static buscaEventosDaEmpresaPeloUId = async(uId)=>{
        let eventosDoDatabase = [];
        await Firebase.database().ref("eventos").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    if(data.uIdEmpresa== uId){
                        eventosDoDatabase = [...eventosDoDatabase, data];
                    }
                })
            }else{
               //nada encontrado
            }
        });
        const eventosARetornar = eventosDoDatabase.slice();
        return eventosARetornar;
    }

    static buscaEventosPorData = async(data)=>{
        let eventosDeHoje = [];
        await Firebase.database().ref("eventos").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const evento = childSnapshot.val();
                    var dataAComparar = converteDataFirebaseParaDate(evento.data);
                    if(dataAComparar== data){
                        eventosDeHoje = [...eventosDeHoje, evento];
                    }
                })
            }else{
               //nada encontrado
            }
        });
        const eventosARetornar = eventosDeHoje.slice();
        return eventosARetornar;
    }

    static buscaEventoPelaKey = async(key)=>{
        var evento = [];
        await Firebase.database().ref("eventos").orderByKey().equalTo(key).once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    evento = [...evento, data];
                    
                })
            }else{
               //nada encontrado
            }
        });
        return evento[0];
    }

    static buscaEventos = async()=>{
        let eventos = [];
        await Firebase.database().ref("eventos").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const evento = childSnapshot.val();
                    if(dataEventoEhMaiorOuIgualAHoje(evento.data)){
                        eventos = [...eventos, evento];
                    }
                })
            }else{
               //nada encontrado
            }
        });
        const eventosARetornar = eventos.slice();
        return eventosARetornar;
    }
}