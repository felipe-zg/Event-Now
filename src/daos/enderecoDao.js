import Firebase from 'react-native-firebase';

export default class EnderecoDao{

    static salvaEndereco = async(endereco)=>{
        const database = Firebase.database();
        try{
            const key = await database.ref("enderecos").push().key;
            endereco.keyEndereco = key;
            await database.ref("enderecos").child(key).set(endereco);
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static atualizaEndereco = async(endereco)=>{
        const database = Firebase.database();
        try{
            await database.ref("enderecos").child(endereco.keyEndereco).set(endereco);
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static deletaEndereco = async(endereco)=>{
        const database = Firebase.database();
        try{
            await database.ref("enderecos").child(endereco.keyEndereco).remove();
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static listaEnderecos = async (uid)=>{
        let enderecosDoDatabase = [];
        await Firebase.database().ref("enderecos").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    if(data.uIdEmpresa== uid){
                        enderecosDoDatabase = [...enderecosDoDatabase, data];
                    }
                })
            }else{
               //nada encontrado
            }
        });
        const enderecosARetornar = enderecosDoDatabase.slice();
        return enderecosARetornar;
    }

    static findEnderecoByKey = async (key)=>{
        var endereco = [];
        await Firebase.database().ref("enderecos").orderByKey().equalTo(key).once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    endereco = [...endereco, data];
                    
                })
            }else{
               //nada encontrado
            }
        });
        return endereco[0];
    }

    static buscaTodosOsEnderecos = async()=>{
        let listaDeEnderecos = [];
        await Firebase.database().ref("enderecos").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    listaDeEnderecos = [...listaDeEnderecos, data];
                })
            }else{
               //nada encontrado
            }
        });
        const enderecosARetornar = listaDeEnderecos.slice();
        return enderecosARetornar;
    }
}