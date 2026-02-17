import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile(){
  const [profile,setProfile]=useState({});

  useEffect(()=>{
    api.get("/users/me").then(res=>setProfile(res.data));
  },[]);

  return(
    <div className="container">
      <h2>👤 My Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>College:</b> {profile.college}</p>
      <p><b>Branch:</b> {profile.branch}</p>
      <p><b>Semester:</b> {profile.semester}</p>
    </div>
  );
}
