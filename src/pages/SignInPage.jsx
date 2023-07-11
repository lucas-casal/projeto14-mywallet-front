import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect } from "react";

export default function SignInPage(props) {
  const navigate = useNavigate();

  function goHome(event){
    event.preventDefault()
    props.login()
  }    
  console.log(props.logged)

  useEffect(()=>{
    props.logged ? navigate('/home') : ''
  }, [props.logged])


  return (
    <SingInContainer>
      <form onSubmit={(event) => goHome(event)}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" onChange={props.handleEmail} type="email" />
        <input data-test="password" placeholder="Senha" onChange={props.handlePassword} type="password" autoComplete="new-password" />
        <button data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
