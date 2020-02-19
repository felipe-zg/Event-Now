import styled from 'styled-components/native';


export const Container = styled.ScrollView`
    flex: 1;
`;

export const ViewFoto = styled.View`
    height: 250px;
`;

export const Foto = styled.Image.attrs({
    resizeMode: 'cover',
})`
    flex: 1;
    align-self: stretch;
    width: undefined;
    height: undefined;
`;

export const Acoes = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

export const Acao = styled.TouchableOpacity`
    padding: 10px;
    margin-top: -30px;
    margin-right: 10px;
    border-radius: 30px;
    background-color: #4B0082;
`;


export const Titulo = styled.Text`
    align-self: center;
    font-size: 18px;
    margin-top: 5px;
`;

export const InfoEvento = styled.View.attrs({
    borderBottomColor: "#000",
    borderBottomWidth: 2,
})`
    flex-direction: row;
    padding: 10px;
`;

export const Descricao = styled.View.attrs({
    borderBottomColor: "#000",
    borderBottomWidth: 2,
})`
    padding: 10px;
`;