import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import axios from "axios";

export default function EditTransactionsPage(props) {
  const navigate = useNavigate()
  const {tipo} = useParams()
  const {id} = useParams()

  function submitForm(event){
    event.preventDefault();
    props.editTransaction(tipo, id)
    navigate('/home')
  }
  
  const token = localStorage.getItem('token')
  useEffect(() => {
    if(!token) return logout()
    axios.get(`${import.meta.env.VITE_API_URL}/home`, {headers:token})
    .then(res => console.log(res))
    .catch((err) => { 
      console.log(err)
      if (err.response.status === 401) return logout()
      console.log(err)
    })
  }, [])

  function logout(){
    localStorage.clear('token')
    navigate('/')
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={(event) => {submitForm(event)}}>
        <input data-test="registry-amount-input" onChange={props.handleLastValue} placeholder="Valor" type="text" value={props.lastValue}/>
        <input data-test="registry-name-input" onChange={props.handleLastDescription} placeholder="Descrição" type="text" value={props.lastDescription} />
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