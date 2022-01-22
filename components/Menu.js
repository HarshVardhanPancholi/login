import React from 'react';
import {Link} from 'react-router-dom'
function Menu(props) {
    return (
      
  <nav className="navbar container-fluid " style={{backgroundImage: "linear-gradient(15deg, #5680e9 0%, #5ab9ea 100%)"}}>
  
  <span className="text-uppercase text-white">
    {props.name}
  </span>
    <button type="button" className="btn btn-success float-right">
      <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
    </button>
</nav>
        
    )
}

export default Menu
