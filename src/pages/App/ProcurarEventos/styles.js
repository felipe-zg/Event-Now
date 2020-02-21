import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;;
`;

export const BtnFiltros = styled.TouchableOpacity`
    width: 80px;
    height: 30px;
    margin: 5px 10px;
    border-radius: 20px;
    background-color: #FF6347;
    align-items: center;
    justify-content: center;
`;

export const Formulario = styled.View`
    margin: 5px 10px;
    padding: 20px;
    border-radius: 20px;
    background-color: #ffff00;
`;

export const BtnEsconderFiltros = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
`;

export const Label = styled.Text`
    font-size: 10px;
    margin: 10px 0 0;
    padding-bottom: 0px;
`;

export const Input = styled.TextInput.attrs({
    borderBottomColor: '#000',
    borderBottomWidth: 1,
})`
    padding: 0 0 1px 0;
    border-radius: 5px;
`;

export const Categoria = styled.View.attrs({
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: '100%',
})`
    padding-bottom: 0px;
`;

export const PickerCategoria = styled.Picker.attrs({
    width: '100%',
})`
    height: 40px;
`;

export const Evento = styled.TouchableOpacity`
    height: 200px;
    margin: 10px 5px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #612F74;
    overflow: hidden;
`;

export const Foto = styled.Image.attrs({
    resizeMode: 'cover',
})`
    flex: 1;
    align-self: stretch;
    width: undefined;
    height: undefined;
`;

export const NotFound = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Animanao = styled.View`
    height: 200px;
    width: 200px;
`;

