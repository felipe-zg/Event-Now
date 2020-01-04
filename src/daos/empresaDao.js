import Firebase from 'react-native-firebase';

export default class EmpresaDao{

    static salvaEmpresa = async(empresa)=>{
        const database = Firebase.database();
        try{
            const key = await database.ref("empresas").push().key;
            empresa.keyEmpresa = key;
            await database.ref("empresas").child(key).set(empresa);
             //Fazer toast de confirmação
        }catch(e){
             //fazer Toast de erro
            console.warn(e);
        }
    }

    static buscaEmpresaPeloId = async(uId)=>{
        var empresa = null;
        await Firebase.database().ref("empresas").orderByKey().once('value',(snapShot)=>{
            if(snapShot.val()){
                snapShot.forEach(childSnapshot=>{
                    const data = childSnapshot.val();
                    if(data.uId == uId){
                        empresa = data;
                    }
                })
            }else{
                console.log("nao achou nada");
            }
        });
        return empresa;
    }

    static deletaEmpresa = async(empresa)=>{
        await Firebase.database().ref("empresas").child(empresa.keyEmpresa).remove();
    }
}