export const validaCNPJ = (cnpj)=>{
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

export const validaCPF = (cpf)=>{
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;
        
    for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
   
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
}

export const dataAtual = ()=>{
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

export const dataAtualMaisUmAno = ()=>{
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear()+1;
    return diaF+"/"+mesF+"/"+anoF;
}

export const converteDataFirebaseParaDate = (data)=>{
    //pega a data no formato 00-00-0000 e converte para 0-0-0000 caso dia e/ou mes comece com 0
    var arrayData = data.split('-');
    const dia = arrayData[0].charAt(0)==0?arrayData[0].replace('0', ''):arrayData[0];
    const mes = arrayData[1].charAt(0)==0?arrayData[1].replace('0', ''):arrayData[1];
    const dataFormatada = `${dia}-${mes}-${arrayData[2]}`;
    return dataFormatada;
}

export const dataEventoEhMaiorOuIgualAHoje = (dataEvento)=>{
    const date  = new Date();
    const hoje = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    const data_do_evento = converteDataFirebaseParaDate(dataEvento);

    const data_hoje = hoje.split('-');
    const data_evento = data_do_evento.split('-');

    if(data_evento[2]<data_hoje[2]) return false;
    if(data_evento[1]<data_hoje[1]) return false;
    if(data_evento[0]<data_hoje[0]) return false;
    return true;
}

export const travaBtnAndroid = ()=>{
    return true;
};

export const handleBackPress = (navigation)=>{
    navigation.goBack();
    return true;
}

