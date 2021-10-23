import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers]=useState([]);
  const nameRef =useRef();
  const emailRef = useRef();

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])
  const handleEmail= (e)=>{
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name, email};
    fetch('http://localhost:5000/users',{
      method: 'post',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      const addedUser = data;
      const newUsers = [...users, addedUser];
      setUsers(newUsers);
    })
    nameRef.current.value = '';
    emailRef.current.value='';
 
    e.preventdefault();
  }
  return (
    <div className="App">
      <h1>Total: {users.length}</h1>
      <form onSubmit={handleEmail}>
        <input ref={nameRef} type="text" placeholder="Name" />
        <input ref={emailRef} type="email" name="" id="" placeholder="Email"/>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user=> <li>{user.id}: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
