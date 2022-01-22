import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

function UserUpdate()
{
    
    var jsonString = sessionStorage.getItem("detalis")
    var retrievedObject = JSON.parse(jsonString);  
    let initialDetails={
        address: {
          addressId: retrievedObject.address.addressId,
          address_Line_1: retrievedObject.address.address_Line_1,
          address_line_2: retrievedObject.address.address_line_2,
          pincode: retrievedObject.address.pincode
        },
        age: retrievedObject.age,
        emailId: retrievedObject.emailId,
        firstname: retrievedObject.firstname,
        gender: retrievedObject.gender,
        lastname: retrievedObject.lastname,
        phoneno: retrievedObject.phoneno,
        user: {
          password: retrievedObject.user.password,
          userid: retrievedObject.user.userid,
          username: retrievedObject.user.username
        },
        userId: retrievedObject.userId
        }
    let [userDetails,setUserDetails]=useState(initialDetails)
    let [msg,setMsg]=useState('')
    let [bid,setBid]=useState(0)
    let [valid,setValid]=useState(false)
    const history = useHistory()

    useEffect(()=>
    {
        const URL=`http://localhost:8080/user/editUser/${sessionStorage.getItem("userId")}`
        if(bid!==0){
          axios.put(URL,userDetails).then(response=>
            {
                sessionStorage.removeItem("password")
                sessionStorage.setItem("password",response.data.user.password)
                history.push("/user")
                return () => {
                  setUserDetails(initialDetails)
                  setBid(0)
                  setValid(false) 
                }
            }).catch(error=>{setMsg(error.response.data.message)})
        }
    },[bid])

    function formValidate() {
        const form = document.querySelector('form')
        var ad2=form.elements.addressline2.value
        var ad1=form.elements.addressline1.value
        var pss=form.elements.password.value
        var pin=form.elements.pincode.value
        var fnm=form.elements.firstname.value
        var lnm=form.elements.lastname.value
        var ag=form.elements.age.value
      
        var error=document.getElementById("error")
      
        var savebtn=document.getElementById("savebutton")
        const validPass = new RegExp('[^a-zA-Z0-9._]+')
        if(pss===''){
            error.innerHTML="Password: length must be greater or equal to 8"
        }
        else if(pss.toString().length<=7){
            error.innerHTML="Password: length must be greater or equal to 8"
        }
        else if(validPass.test(pss)){
          error.innerHTML="Password: Enter valid password(Combination of a-z,A-Z,0-9,_)"
        }
        else if(fnm===''){
          error.innerHTML="First Name: Cannot be empty"
        }
        else if(lnm===''){
          error.innerHTML="Last Name: Cannot be empty"
        }
        else if(ag<=0){
          error.innerHTML="Age: Enter valid age"
        }
        else if(ag>=100){
          error.innerHTML="Age: Enter valid age"
        }
        else if(ag%1!==0){
            error.innerHTML="Age: Provide integer value"
        }
        else if(ag<=18){
          error.innerHTML="Age: Your are underage"
        } 
        else if(ad1.length<=4){
            error.innerHTML="Address line 1: length must be greater than 4"
        }
        else if(ad2.length<=4){
            error.innerHTML="Address line 2: length must be greater than 4"
        }
        else if(pin.toString().length!==6){
            error.innerHTML="PIN: Pincode should be in six digits"
        }
        else if(pin<=0){
            error.innerHTML="PIN: Pincode should be in six digits"
        }
        else if(pin%1!==0){
            error.innerHTML="PIN: Provide integer value"
        }
        else if(pin.toString().charAt(0)==="0"){
            error.innerHTML="PIN: Pincode should not start with 0"
        }
        else{
            error.innerHTML=""
            savebtn.style.pointerEvents="auto"
            setValid(true)
        }
      }

    function handleBtnClick(e)
    {
        e.preventDefault()
        setBid(1)
    
    }

    return (
        (sessionStorage.length!==0)?
        <>
            <Header/>
            <Menu name="Update Page"/>
            <div  className="container-fluid">
                <div id='title' className="py-3">
                    <span className="text-center fw-bold text-light fs-5">Welcome {sessionStorage.getItem("userName")}</span>
                    <button className="btn-sm btn-danger float-end">
                        <Link className="nav-link text-light" aria-current="page" to="/logout">Log Out</Link>
                    </button>
                </div>
                <div style={{backgroundImage: "linear-gradient(15deg, #5ab9ea 0%,#e7e3d4 100%)"}} className="p-1 m-3 border border-info border-4 ">
                    <form onSubmit={handleBtnClick} className="col-4 container">
                        <div className='form-group'>
                            <label>Password<span style={{color: "red"}}>*</span></label>
                            <input name="password" placeholder="Enter Password" type='password' className='form-control'
                                value={userDetails.user.password}
                                onInput={formValidate}
                                onChange={e=>setUserDetails({...userDetails,user:{...userDetails.user,password:e.target.value}})}/>
                        </div>
                        <div className='form-group'>
                            <label>First name<span style={{color: "red"}}>*</span></label>
                            <input name="firstname" placeholder="Enter first name" className='form-control' 
                                value={userDetails.firstname} 
                                onInput={formValidate}
                                onChange={e=>setUserDetails({...userDetails,firstname:e.target.value})}/>
                        </div>
                        <div className='form-group'>
                            <label>Last name<span style={{color: "red"}}>*</span></label>
                            <input name="lastname" placeholder="Enter last name" className='form-control' 
                                value={userDetails.lastname} 
                                onInput={formValidate}
                                onChange={e=>setUserDetails({...userDetails,lastname:e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Age<span style={{color: "red"}}>*</span></label>
                            <input className="form-control"
                                placeholder="Enter your age"
                                type="number"
                                name="age"
                                value={userDetails.age}
                                onInput={formValidate}
                                onChange={e=>setUserDetails({...userDetails,age:e.target.value})}/>
                        </div>
                        <div className='form-group'>
                            <label>Address Line 1<span style={{color: "red"}}>*</span></label>
                            <input name="addressline1" placeholder="Enter street address" className='form-control' 
                            value={userDetails.address.address_Line_1} 
                            onInput={formValidate}
                            onChange={e=>setUserDetails({...userDetails,address:{...userDetails.address,address_Line_1:e.target.value}})}/>
                        </div>
                        <div className='form-group'>
                            <label>Address Line 2<span style={{color: "red"}}>*</span></label>
                            <input name="addressline2" placeholder="Enter city, state and country" className='form-control' 
                            value={userDetails.address.address_line_2} 
                            onInput={formValidate}
                            onChange={e=>setUserDetails({...userDetails,address:{...userDetails.address,address_line_2:e.target.value}})}/>
                        </div>
                        <div className='form-group'>
                            <label>Pin code<span style={{color: "red"}}>*</span></label>
                            <input name="pincode" placeholder="If other than India--> 999999" type='number' 
                            className='form-control' 
                            value={userDetails.address.pincode} 
                            onInput={formValidate}
                            onChange={e=>setUserDetails({...userDetails,address:{...userDetails.address,pincode:e.target.value}})}/>
                        </div>
                        <div className='form-group'>
                            <input id="savebutton" type="submit" disabled={!valid} className='btn btn-success mt-2' value="Update"/>
                        </div>
                        
                    </form>


                <br/><br/><br/><br/>
                <h6 id="error" className="text text-danger"></h6>
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

export default UserUpdate