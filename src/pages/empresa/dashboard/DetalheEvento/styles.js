import styled from 'styled-components/native';

export const Banner = styled.View.attrs({
    borderBottomWidth: 3,
    borderColor: '#612F74',
})`
    height: 250px;
`;

export const Imagem = styled.Image.attrs({
    resizeMode: 'cover',
    alignSelf: 'stretch',
})`
     flex: 1;
    width: undefined;
    height: undefined;
`;

export const Info = styled.View`
    margin: 10px 5px 5px 5px;
    padding: 12px 5px;
    border: 2px solid #612F74;
    border-radius: 5px;
`;

export const Titulo = styled.Text`
    align-self: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 3px;
`;

export const Texto = styled.Text`
    align-self: center;
    font-size: 14px;
`;

export const Label = styled.Text`
    align-self: center;
    font-size: 16px;
    color: #fff;
`;

export const Botoes = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin: 20px 0;
`;
export const Botao = styled.TouchableOpacity`
    border-radius: 20px;
    width: 40%;
    padding: 5px 0;
    overflow: hidden;
    background-color: ${props => props.color}
`;