import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import axios from "axios";

export default function EditTransactionsPage(props) {
  const navigate = useNavigate()
  const {tipo} = useParams()
  const {id} = useParams()

  useEffect(() => {
    props.logged && localStorage.getItem('token') ? '' : navigate('/')
  }, [])

  function submitForm(event){
    event.preventDefault();
    props.editTransaction(tipo, id)
    navigate('/home')
  }
  
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={(event) => {submitForm(event)}}>
        <input required data-test="registry-amount-input" onChange={props.handleLastValue} placeholder="Valor" type="text" value={props.lastValue}/>
        <input required data-test="registry-name-input" onChange={props.handleLastDescription} placeholder="Descrição" type="text" value={props.lastDescription} />
        <button data-test="registry-save" >Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
