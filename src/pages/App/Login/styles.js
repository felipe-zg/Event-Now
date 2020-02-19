import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Animacao = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const Formulario = styled.ScrollView`
    flex: 2;
`;

export const Toggle = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

export const ToggleAnimation = styled.View`
    height: 100px;
    width: 100px;
`;

export const InputView = styled.View.attrs({
    borderBottomWidth: 1,
    borderBottomColor: "grey",
})`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const Input = styled.TextInput`
    padding: 0px;
    width: 85%;
`;

export const Acao = styled.TouchableOpacity`
    align-self: center;
    margin-top: ${props => props.marginTop};
`;
