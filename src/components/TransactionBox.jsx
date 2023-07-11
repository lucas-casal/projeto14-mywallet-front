import axios from "axios"
import { useContext, useEffect } from "react"
import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"

export default function TransactionBox(props){
  const navigate = useNavigate()
  const contexto = useContext(UserContext)
  const valor = parseFloat(props.valor).toFixed(2)
  const token = localStorage.getItem('token')
  async function deleteTransaction(x){
    try{
    console.log(x.target.id)
    await axios.delete(`${import.meta.env.VITE_API_URL}/nova-transacao`,{body:{}, headers:{tid: x.target.id,token: token}})
    props.setRefresh(true)
  } catch(err) {
    console.log(err)
  }
}

function updateTransaction(x){
  const tid = props.id;
  const tipo = props.tipo;
  props.setLastValue(props.valor);
  props.setLastDescription(props.descricao);
  navigate(`/editar-registro/${tipo}/${tid}`)
}

  return (
    <Container>
    <ListItemContainer id={props.id} onClick={x => updateTransaction(x)}>
        <InfoBox>
            <Data>{props.data}</Data>
            <Descricao data-test="registry-name">{props.descricao}</Descricao>
        </InfoBox>
        <Value data-test="registry-amount" color={props.tipo === 'entrada'? "positivo" : "negativo"}>{valor}</Value>
    </ListItemContainer>
    <DeleteIcon id={props.id} onClick={(x)=> deleteTransaction(x)}>x</DeleteIcon>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: space-between
`
const DeleteIcon = styled.p`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #C6C6C6;
  &:hover{
    cursor:pointer;
  }

`

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
  width: 100%;
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
  &:hover {
    cursor: pointer;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`