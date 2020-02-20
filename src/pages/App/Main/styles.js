import styled from 'styled-components/native';

export const Container = styled.View`
  
`;

export const Filtros = styled.ScrollView.attrs({
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
})`
    flex-direction: row;
`;

export const Filtro = styled.TouchableOpacity.attrs({
    paddingHorizontal:10,
})`
    height: 40px;
    margin: 5px;
    padding: 2px 10px;
    justify-content: center;
    align-items: center;
    border: solid 1px #ddd;
    border-radius: 3px;
    background-color: #FF6347;
`;

export const Foto = styled.Image.attrs({
    resizeMode: 'cover',
})`
    flex: 1;
    align-self: stretch;
    width: undefined;
    height: undefined;
`;

export const NotFound = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

`;

export const Animacao = styled.View`
    height: 200px;
    width: 200px;
`;

export const Categoria = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
`;

export const Seta = styled.View`
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
`;

export const RowEventos = styled.ScrollView.attrs({
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
})`
    flex-direction: row;
    padding: 0 10px 15px 10px;
`;

export const EventoFiltrado = styled.TouchableOpacity`
    height: 200px;
    margin: 10px 5px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #612F74;
    overflow: hidden;
`;

export const TituloEventoFiltrado = styled.Text`
    font-size: 13px;
    font-weight: bold;
    margin-left: 10px;
    padding: 2px 0;
    color: #fff;
`;

export const Evento = styled.TouchableOpacity`
    height: 140px;
    width: 180px;
    margin: 0 10px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 3px;
`;

export const TituloEvento = styled.Text`
    font-size: 11px;
    margin-left: 10px;
    color: #612F74;
`;
