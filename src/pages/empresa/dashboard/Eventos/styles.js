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

export const Evento = styled.TouchableOpacity`
    height: 150px;
    margin: 10px 5px 5px 5px;
    border-bottom-width: 3px;
    border-color: #612F74;
    border-style: solid;
    border-radius: 5px;
`;

export const Foto = styled.Image.attrs({
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
})`
    flex: 1;
    align-self: stretch;
`;