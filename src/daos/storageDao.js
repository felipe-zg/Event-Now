import Firebase from 'react-native-firebase';


export default class StorageDao{

    static salvaFoto = async (uid, keyEvento, filePath)=>{
        const storageRef = Firebase.storage().ref("fotos");
        const caminhoFinal = storageRef.child(uid + "/" + keyEvento + ".jpg");
        await caminhoFinal.putFile(filePath);
    }

    static getUrlFoto = async (uid,keyEvento)=>{
        const storageRef = Firebase.storage().ref("fotos/"+uid + "/" + keyEvento + ".jpg");
        try{
            const url = await storageRef.getDownloadURL();
            return url;
        }catch(err){
            console.log(err);  
        };
    }

    static deletaFoto = async (url)=>{
        Firebase.storage().refFromURL(url).delete()
            .then(() => {
                return true
            })
            .catch((deleteError) => {
                return deleteError;
            });
    }
}