import styled from "styled-components"
export default function TransactionBox(props){
    
  const valor = parseFloat(props.valor).toFixed(2)
  
  return (
    <ListItemContainer>
        <InfoBox>
            <Data>{props.data}</Data>
            <Descricao data-test="registry-name">{props.descricao}</Descricao>
        </InfoBox>
        <Value data-test="registry-amount" color={props.tipo === 'entrada'? "positivo" : "negativo"}>{valor}</Value>
    </ListItemContainer>
  )
}

const InfoBox = styled.div`
    display: block;
    height: 19px;
    width: 200px;
`
const Data = styled.span`
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
`

const Descricao = styled.strong`
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;

`

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`