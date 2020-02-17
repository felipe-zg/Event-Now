import styled from 'styled-components/native';

export const Label = styled.Text`
    margin-top: 20px;
    font-size: 10px;
`;
export const Input = styled.TextInput`
    border : 1px solid #000;
    border-radius: 5px;
    padding-bottom: 0;
`;

export const InputMensagem = styled.TextInput.attrs({
    textAlignVertical: 'top',
})`
    border : 1px solid #000;
    border-radius: 5px;
    padding: 7px 0;
    height: 150px;
`;

export const PickerView = styled.View`
    border : 1px solid #000;
    border-radius: 5px;
    padding: 0;
`;
