import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Row = styled.View`
    flex-direction: row;
`;

export const Foto = styled.TouchableOpacity`
    height: 150px;
    margin: 10px 5px 5px 5px;
    border: 3px solid #612F74;
    border-radius: 5px;
`;

export const Imagem = styled.Image.attrs({
    resizeMode: 'cover',
})`
    flex: 1;
    align-self: stretch;
    width: undefined;
    height: undefined;
`;

export const Label = styled.Text`
    color: #612F74;
    font-weight: bold;
    margin: 10px 0 0 0;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
`;

export const Input = styled.TextInput`
    padding: 0px;
    border-bottom-width: 1px;
    border-color: #612F74;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
`;

export const InputDescricao = styled.TextInput.attrs({
    textAlignVertical: 'top',
})`
    padding-bottom: 0px;
    border: 1px solid grey;
    border-radius: 10px;
    height: 150px;
`;

export const ViewPicker = styled.View`
    padding-bottom: 0px;
    border-bottom-width: 1px;
    border-color: #612F74;
    border-style: solid;
    width: 100%;
`;
