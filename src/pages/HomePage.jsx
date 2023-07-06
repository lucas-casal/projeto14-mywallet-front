import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import dotenv from "dotenv"
import { UserContext } from "../components/UserContext"
import TransactionBox from "../components/TransactionBox"
import { useNavigate } from "react-router-dom"

export default function HomePage(props) {
  const contexto = useContext(UserContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [transactions, setTransactions] = useState([])

  console.log(contexto.token)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/home`, {
      headers: {token: contexto.token}
    })
    .then(res =>{
      setName(res.data.name)
      setBalance(res.data.balance)
      setTransactions(res.data.relatedTransactions)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, [contexto.token, props.logged])

  function newIncome(){
    navigate('/nova-transacao/entrada')
  }
  function newExpense(){
    navigate('/nova-transacao/saida')
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(x =>{
            return <TransactionBox key={x._id} tipo={x.tipo} valor={x.value} descricao={x.description} data={x.time}/>
          })}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "positivo" : "negativo"}>{balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => {newIncome() ; props.setTipo("entrada") }}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => {newExpense() ; props.setTipo("saida") }}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`