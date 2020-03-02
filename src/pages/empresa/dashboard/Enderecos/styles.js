import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const ViewAnimacao = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Animacao = styled.View`
    height: 200px;
    width: 200px;
    margin-bottom: 20px;
`;

export const TxtAnimacao = styled.Text`
    font-size: 16px;
    text-align: center;
    padding: 0 10px;
`;

export const Endereco = styled.View`
    align-items: center;
    border: 1px solid #612F74;
    border-radius: 5px;
    margin: 10px 5px 0 5px;
    padding: 5px;
`;

export const Botoes = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin: 20px 0 10px 0;
    width: 100%;
`;

export const Botao = styled.TouchableOpacity`
    border-radius: 20px;
    width: 40%;
    overflow: hidden;
    background-color: ${props => props.color};
`;

export const LabelBotao = styled.Text`
    font-size: 14px;
    color: #fff;
    text-align: center;
    padding: 5px;
    text-transform: uppercase;
`;


