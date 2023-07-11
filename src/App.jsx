import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState, useEffect } from "react"
import axios from 'axios'
import { UserContext } from "./components/UserContext"
import EditTransactionsPage from "./pages/EditTransactionPage"

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
  const [refresh, setRefresh] = useState(false)
  const [lastValue, setLastValue] = useState('')
  const [lastDescription, setLastDescription] = useState('')
  const [idTransaction, setIdTransaction] = useState('')

  
  function handleEmail(x){
    const wrote = x.target.value;
    setEmail(wrote);
  }

  function handlePassword(x){
    const wrote = x.target.value;
    setPassword(wrote);
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
    setValue(wrote);
  }

  function handleDescription(x){
    const wrote = x.target.value;
    setDescription(wrote);
  }

  function handleLastDescription(x){
    const wrote = x.target.value;
    setLastDescription(wrote);
  }

  function handleLastValue(x){
    const wrote = x.target.value;
    setLastValue(wrote);
  }

  
  function login(){
      const objSent = {email, password}
      console.log(objSent)
      axios.post(`${import.meta.env.VITE_API_URL}/`, objSent)
      .then( ans => {
        localStorage.setItem('token', ans.data)
        console.log(ans.data)
        setLogged(true)
        setRefresh(true)
      })
      .catch (err => {
        console.log(err)
        alert(`${err.response.status} - ${err.response.data}`)
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
      console.log(err)
      alert(`${err.response.status} - ${err.response.data}`)
      setLogged(false)
    })
  }

  function sendTransaction(tipo){
    const token = localStorage.getItem('token')
    const valor = value.includes(',') ? value.replace(',', '.') : value 
    const objSent = {value: valor, description: description}
    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`,
      objSent,{
      headers: {token}
    })
    .then( ans => {
      console.log(ans)
      setSend(true)
    })
    .catch (err => {
      console.log(err)
      alert(`${err.response.status} - ${err.response.data}`)
    })
  }

  function logout(){
    const token = localStorage.getItem('token')
    axios.delete(`${import.meta.env.VITE_API_URL}/home`,{
      headers: {token}
    })
    .then( ans => {
      console.log(ans)
      localStorage.clear()
      setLogged(false)
    })
    .catch (err => {
      console.log(err)
      alert(`${err.response.status} - ${err.response.data}`)
    })
  }

  function editTransaction(tipo, id){
    const token = localStorage.getItem('token')
    const valor = lastValue.includes(',') ? lastValue.replace(',', '.') : lastValue 
    const objSent = {value: valor, description: lastDescription}
    console.log(objSent)
    axios.put(`${import.meta.env.VITE_API_URL}/editar-registro/${tipo}/${id}`,
      objSent,
      {headers:{token}})
    .then( ans => {
      console.log(ans)
      setSend(true)
    })
    .catch (err => {
      console.log(err)
      alert(`${err.response.status} - ${err.response.data}`)
    })
  }

  return (
    <PagesContainer>
      <BrowserRouter>
      <UserContext.Provider value={{token: localStorage.getItem('token')}}>
        <Routes>
          <Route path="/" element={<SignInPage setLogged={setLogged} logged={logged} login={login} handleEmail={handleEmail} handlePassword={handlePassword}/>} />
          <Route path="/cadastro" element={<SignUpPage setRegistered={setRegistered} registered={registered} register={register} handleEmail={handleEmail} handlePassword={handlePassword} handleName={handleName} handlePassCheck={handlePassCheck}/>} />
          <Route path="/home" element={<HomePage setLogged={setLogged} setIdTransaction={setIdTransaction} setLastDescription={setLastDescription} setLastValue={setLastValue} setRefresh={setRefresh} refresh={refresh} logout={logout} logged={logged} setTipo={setTipo} />} />
          <Route path='/nova-transacao/:tipo' element={<TransactionsPage logged={logged} logout={logout} setSend={setSend} send={send} tipo={tipo} sendTransaction={sendTransaction} handleValue={handleValue} handleDescription={handleDescription}/>} />
          <Route path='/editar-registro/:tipo/:id' element={<EditTransactionsPage logged={logged} editTransaction={editTransaction} handleLastValue={handleLastValue} handleLastDescription={handleLastDescription} idTransaction={idTransaction} lastValue={lastValue} lastDescription={lastDescription} logout={logout} setSend={setSend} send={send} tipo={tipo} />} />
        </Routes>avigate('/home')
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
