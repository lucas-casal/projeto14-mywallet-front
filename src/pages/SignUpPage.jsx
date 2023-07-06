import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from 'axios'
import { useEffect } from "react"

export default function SignUpPage(props) {
  const navigate = useNavigate()

  function sendRegister(event){
    event.preventDefault()
    props.register()
  }
  
  useEffect(()=>{
    props.registered ? navigate('/') : ''
  }, [props.registered])

  return (
    <SingUpContainer>
      <form onSubmit={sendRegister}>
        <MyWalletLogo />
        <input onChange={props.handleName} placeholder="Nome" type="text" />
        <input onChange={props.handleEmail} placeholder="E-mail" type="email" />
        <input onChange={props.handlePassword} placeholder="Senha" type="password" autoComplete="new-password" />
        <input onChange={props.handlePassCheck} placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button>Cadastrar</button>
      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
