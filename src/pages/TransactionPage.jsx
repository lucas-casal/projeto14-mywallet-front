import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function TransactionsPage(props) {
  const navigate = useNavigate()
  const {tipo} = useParams()

  function submitForm(event){
    event.preventDefault();
    props.sendTransaction(tipo)
    navigate('/home')
  }

 /*useEffect(() => {
    props.setSend(false)

  }, [props.send])*/


  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={(event) => {submitForm(event)}}>
        <input onChange={props.handleValue} placeholder="Valor" type="text"/>
        <input onChange={props.handleDescription} placeholder="Descrição" type="text" />
        <button>Salvar {tipo}</button>
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