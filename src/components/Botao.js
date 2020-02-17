import styled from 'styled-components/native';

const Botao = styled.TouchableOpacity`
    margin-top: ${props => props.marginTop};
    padding: 7px 0;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${props => props.color};
    align-items: center;
`;

export default Botao;