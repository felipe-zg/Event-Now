import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
`;

export const Animacao = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Label = styled.Text`
    color: #612F74;
    font-weight: bold;
    padding-bottom: 0;
    margin: 10px 0 0 0;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
`;

export const Input = styled.TextInput`
    padding: 0px;
    border-bottom-width: 1px;
    border-color: grey;
    border-style: solid;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
`;

export const ViewPicker = styled.View`
    padding: 0;
    border-bottom-width: 1px;
    border-color: grey;
    width: 26%;
`;

export const Row = styled.View`
    flex-direction: row;
`;