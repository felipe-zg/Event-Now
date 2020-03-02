import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Animacao = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput`
    padding-bottom: 0px;
    border-bottom-width: 1px;
    border-color: grey;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
`;

export const ViewPicker = styled.View`
    padding-bottom: 0px;
    border-bottom-width: 1px;
    border-color: grey;
    width: 26%;
`;