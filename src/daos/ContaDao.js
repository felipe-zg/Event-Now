import Firebase from 'react-native-firebase';

export default class ContaDao{
    static criaConta = async(email, password)=>{
        try{
            const novaConta = await Firebase.auth()
                .createUserWithEmailAndPassword(email, password);

            return novaConta.user.uid;
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
            return null;
        }
    }

    static salvaContaNoDatabase = async(uid, tipo)=>{
        const database = Firebase.database();
        try{
            const key = await database.ref("conta").push().key;
            conta = {keyConta:key, uid: uid, tipo:tipo}
            await database.ref("conta").child(key).set(conta);
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static buscaContaPeloUId = async(uId)=>{
        var conta = null;
        await Firebase.database().ref("conta").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    if(data.uid == uId){
                        conta = data;
                    }
                })
            }else{
                console.log("nao achou nada");
            }
        });
        
        return conta;
    }

    static sair = ()=>{
        Firebase.auth().signOut();
    }

    static deletaConta = async(conta)=>{
        await Firebase.database().ref("conta").child(conta.keyConta).remove();
    }
}