import Firebase from 'react-native-firebase'

export default class UsuarioDao{
    constructor(){
        this._database = firebase.database();
    }


    static criaConta = async(email, password)=>{
        try{
            const novoUsuario = await Firebase.auth()
                .createUserWithEmailAndPassword(email, password);

            return novoUsuario.user.uid;
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
            return null;
        }
    }

    static salvaUsuario = async(usuario)=>{
        const database = Firebase.database();
        try{
            const key = await database.ref("usuarios").push().key;
            usuario.keyUsuario = key;
            const keylistaFavoritos = await database.ref("listaFavoritos").push().key;
            usuario.keyListaFavoritos = keylistaFavoritos;
            await database.ref("usuarios").child(key).set(usuario);
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static recuperarSenha = async(email)=>{
        await Firebase.auth().sendPasswordResetEmail(email)
            .then( user => {
                
            })
            .catch(function (e) {
                
            })
    }

    static buscaUsuarioPeloUId = async(uId)=>{
        var usuario = null;
        await Firebase.database().ref("usuarios").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    if(data.uId == uId){
                        usuario = data;
                    }
                })
            }else{
                console.log("nao achou nada");
            }
        });
        return usuario;
    }

    static adicionaEventoAListaDeFavoritos = async(keyListaFavoritos ,keyEvento)=>{
        const database = Firebase.database();
        try{
            await database.ref("listaFavoritos").child(keyListaFavoritos).push({"keyFavorito": keyEvento});
        }catch(e){
            console.log(e);
        }
    }

    static listaDeKeysEventosFavoritos = async(keyListaFavoritos)=>{
        let keys = [];
        await Firebase.database().ref("listaFavoritos").child(keyListaFavoritos).once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    keys = [...keys, data];
                    
                })
            }else{
               //nada encontrado
            }
        });
        const listaKeysFavoritos = keys.slice();
        return listaKeysFavoritos;
    }

    static deletaFavoritoDaLista = async(keyListaFavoritos, keyEvento)=>{
        var favoritoARemover = null;
        await Firebase.database().ref("listaFavoritos").child(keyListaFavoritos).once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    if(data.keyFavorito == keyEvento){
                        favoritoARemover = childSnapshot.key;
                    }
                })
            }else{
               //nada encontrado
            }
        });
        await Firebase.database().ref("listaFavoritos").child(keyListaFavoritos).child(favoritoARemover).remove();
    }

}



