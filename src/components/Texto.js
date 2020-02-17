import styled from 'styled-components/native';

const Texto = styled.Text`
    color: ${props => props.color};
    font-size: ${props => props.size};
`;

export default Texto;