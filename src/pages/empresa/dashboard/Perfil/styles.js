import styled from 'styled-components/native';

export const Info = styled.View`
    align-Items: center;
    background-color: #612F74;
    padding: 10px 10px 20px 10px;
    margin-bottom: 30px;
    border-bottom-width: 3px;
    border-color: orange;
    border-style: solid;
`;

export const Informacao = styled.Text`
    color: #fff;
    padding: 2px 0;
    font-size: 13px;
`;

export const MenuItem = styled.TouchableOpacity`
    align-items: center;
    margin: 5px 0;
    padding: 7px 0;
    width: 100%;
    border-bottom-width: 2px;
    border-color: grey;
    border-style: solid;
`;

export const MenuText = styled.Text`
    color: ${props => props.color};
    text-transform: uppercase;
`;