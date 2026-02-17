import { Link } from "react-router-dom";

export default function Navbar(){
  return(
    <nav style={{background:"#0f172a",padding:"15px",color:"white"}}>
      <b>CampusVault AI</b>
      <Link to="/" style={{marginLeft:20,color:"white"}}>Dashboard</Link>
      <Link to="/upload" style={{marginLeft:20,color:"white"}}>Upload</Link>
      <Link to="/admin" style={{marginLeft:20,color:"white"}}>Admin</Link>
      <Link to="/login" style={{marginLeft:20,color:"white"}}>Login</Link>
    </nav>
  );
}
