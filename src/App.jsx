import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState, useEffect } from "react"
import axios from 'axios'
import { UserContext } from "./components/UserContext"

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passCheck, setPassCheck] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('')
  const [tipo, setTipo] = useState('')
  const [send, setSend] = useState(false)
  const [logged, setLogged] = useState(false)
  const [registered, setRegistered] = useState(false)

  
  function handleEmail(x){
    const wrote = x.target.value;
    setEmail(wrote);
    console.log(wrote)
  }

  function handlePassword(x){
    const wrote = x.target.value;
    setPassword(wrote);
    console.log(wrote)
  }

  function handleName(x){
    const wrote = x.target.value;
    setName(wrote);
  }

  function handlePassCheck(x){
    const wrote = x.target.value;
    setPassCheck(wrote);
  }

  function handleValue(x){
    const wrote = x.target.value;
    console.log(wrote)
    setValue(wrote);
  }

  function handleDescription(x){
    const wrote = x.target.value;
    console.log(wrote)
    setDescription(wrote);
  }

  function login(){
      const objSent = {email, password}
      axios.post(`${import.meta.env.VITE_API_URL}/`, objSent)
      .then( ans => {
        localStorage.setItem('token', ans.data)
        setLogged(true)
      })
      .catch (err => {
        console.log(err.status)
        alert(err.status)
        setLogged(false)
      })
  }

  function register(){
    const objSent = {email, password, name}
    if(passCheck !== password) return alert(`Sua senha está diferente da confirmação`)
    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, objSent)
    .then( ans => {
      console.log(ans)
      setRegistered(true)
    })
    .catch (err => {
      console.log(err.status)
      alert(err.status)
      setLogged(false)
    })
}

  function sendTransaction(tipo){
    console.log(tipo)
    const token = localStorage.getItem('token')
    console.log(token)
    const valor = value.includes(',') ? value.replace(',', '.') : value 
    const objSent = {value: valor, description: description}
    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`,
      objSent,{
      headers: {"token": token}
    })
    .then( ans => {
      console.log(ans)
      setSend(true)
    })
    .catch (err => {
      console.log(err)
    })
}
  return (
    <PagesContainer>
      <BrowserRouter>
      <UserContext.Provider value={{token: localStorage.getItem('token')}}>
        <Routes>
          <Route path="/" element={<SignInPage logged={logged} login={login} handleEmail={handleEmail} handlePassword={handlePassword}/>} />
          <Route path="/cadastro" element={<SignUpPage registered={registered} register={register} handleEmail={handleEmail} handlePassword={handlePassword} handleName={handleName} handlePassCheck={handlePassCheck}/>} />
          <Route path="/home" element={<HomePage logged={logged} setTipo={setTipo} />} />
          <Route path='/nova-transacao/:tipo' element={<TransactionsPage setSend={setSend} send={send} tipo={tipo} sendTransaction={sendTransaction} handleValue={handleValue} handleDescription={handleDescription}/>} />
        </Routes>
      </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
