import {Link} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';


function User(){
    let initialDetails={
        address: {
          addressId: 0,
          address_Line_1: '',
          address_line_2: '',
          pincode: 0
        },
        age: 0,
        emailId: '',
        firstname: '',
        gender: '',
        lastname: '',
        phoneno: 0,
        user: {
          password: '',
          userid: 0,
          username: ''
        },
        userId: 0
        }
    let [userDetails,setUserDetails]=useState(initialDetails)
    let [msg,setMsg]=useState('') 

    useEffect(() => {
        const URL = `http://localhost:8080/user/viewCustomer/${sessionStorage.getItem("userId")}`
        axios
          .get(URL)
          .then((response) => {
            setUserDetails(response.data)  
          })
          .catch(error=>{setMsg(error.response.data.message)});
      },[])
      
      function handleBtnClick(e)
      {
          e.preventDefault()
          sessionStorage.setItem("detalis",JSON.stringify(userDetails))
      }

    return(
        (sessionStorage.length!==0)?
        <>
            <Header/>
            <Menu name="Profile Page"/>
            <div  className="container-fluid">
                <div id='title' className="py-3">
                    <span className="text-center fw-bold text-light fs-5">Welcome {sessionStorage.getItem("userName")}</span>
                    <button className="btn-sm btn-danger float-end">
                        <Link className="nav-link text-light" aria-current="page" to="/logout">Log Out</Link>
                    </button>
                </div>
                <div style={{backgroundImage: "linear-gradient(15deg, #5ab9ea 0%,#e7e3d4 100%)"}} className="p-1 m-3 border border-info border-4 ">
                    <table className="table table-bordered table-hover container table-striped">
                        <thead style={{color:"white",backgroundColor: "#b23850"}}>
                                <tr><th colSpan="2">Profile Details</th></tr>
                        </thead>
                        <tbody style={{backgroundColor: "#c4dbf6 "}}>
                            <tr>
                                <td><b>Username:</b></td>
                                <td>{userDetails.user.username}</td>
                            </tr>
                            <tr>
                                <td><b>Name:</b></td>
                                <td>{userDetails.firstname}&nbsp;{userDetails.lastname}</td>
                            </tr>
                            <tr>
                                <td><b>Age:</b></td>
                                <td>{userDetails.age}</td>
                            </tr>
                            <tr>
                                <td><b>Gender:</b></td>
                                <td>{userDetails.gender}</td>
                            </tr>
                            <tr>
                                <td><b>Phone Number:</b></td>
                                <td>{userDetails.phoneno}</td>
                            </tr>
                            <tr>
                                <td><b>Email:</b></td>
                                <td>{userDetails.emailId}</td>
                            </tr>
                            <tr>
                                <td><b>Address:</b></td>
                                <td>{userDetails.address.address_Line_1},&nbsp;{userDetails.address.address_line_2}</td>
                            </tr>
                            <tr>
                                <td><b>Pincode:</b></td>
                                <td>{userDetails.address.pincode}</td>
                            </tr>
                        </tbody>
                        <tfoot style={{color:"white",backgroundColor: "#b23850"}}>
                            <tr>
                                <td className="fw-bold">
                                    Click here to update details
                                </td>
                                <td>
                                    <button onClick={handleBtnClick} type="button" className="btn-md btn-warning">
                                        <Link className="nav-link text-light" to="/userupdate">Update details</Link>
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                <br/><br/><br/><br/>
                <h6 className="text text-danger">{msg}</h6>
                </div>
            </div>
            <Footer/>
        </>:
        <>
            <Header/>
            <Menu name="Unauthorized Page"/>
            <div style={{margin:"11% 0%"}} className="container-fluid text-center text-secondary  justify-content-center">
                <span style={{backgroundImage: "linear-gradient(15deg, #5ab9ea 0%,#e7e3d4 100%)"}} className="p-5 m-5 fw-bold fs-5 border border-warning d-block border-4 ">You have to LOGIN / SIGN UP with your EMail</span>
            </div>
            <Footer/>
        </>
    )
}
export default User;