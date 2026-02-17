import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav=useNavigate();

  const login=async()=>{
    const res=await api.post("/auth/login",null,{params:{email,password}});
    localStorage.setItem("token",res.data.access_token);
    nav("/");
  };

  return(
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
      <button onClick={login}>Login</button>
    </div>
  );
}
