import React from 'react';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';

function Registration(){
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
let [cpass,setCpass]=useState('')
let [msg,setMsg]=useState('')
let [bid,setBid]=useState(0)
let [valid,setValid]=useState(false)
const history = useHistory()

useEffect(()=>
{
    const URL=`http://localhost:8080/user/addUser`
    if(valid){
      axios.post(URL,userDetails).then(response=>
        {
            sessionStorage.setItem("password",response.data.user.password)
            sessionStorage.setItem("userName",response.data.user.username)
            sessionStorage.setItem("userId",response.data.user.userid)
            history.push("/user")
            return () => {
              setUserDetails(initialDetails)
              setCpass('')
              setBid(0)
              setValid(false) 
            }
        }).catch(error=>{setMsg(error.response.data.message)
          setUserDetails(initialDetails)
          setCpass('')
          setBid(0)
          setValid(false)
          return()=>{
             setInterval(setMsg(''),2000)
          }
        })
    }
},[bid])

function formValidate() {
  const form = document.querySelector('form')
  var phn=form.elements.phonenumber.value
  var usr=form.elements.username.value
  var ad2=form.elements.addressline2.value
  var ad1=form.elements.addressline1.value
  var pss=form.elements.password.value
  var pin=form.elements.pincode.value
  var fnm=form.elements.firstname.value
  var lnm=form.elements.lastname.value
  var eid=form.elements.email.value
  var gen=form.elements.gender.value
  var ag=form.elements.age.value
  var cps= form.elements.cpassword.value

  var error=document.getElementById("error")

  var savebtn=document.getElementById("savebutton")

  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
  const validUser = new RegExp('[^a-zA-Z0-9]+')
  const validPass = new RegExp('[^a-zA-Z0-9._]+')
  if(usr===''){
      error.innerHTML="Username: Can only have alphanumeric and length must be greater than 6"
  }
  else if(usr.length<=6){
      error.innerHTML="Username: length must be greater than 6"
  }
  else if(validUser.test(usr)){
    error.innerHTML="Username: Enter valid username, can only have alphanumeric"
  }
  else if(pss===''){
      error.innerHTML="Password: length must be greater or equal to 8"
  }
  else if(pss.toString().length<=7){
      error.innerHTML="Password: length must be greater or equal to 8"
  }
  else if(validPass.test(pss)){
    error.innerHTML="Password: Enter valid password(Combination of a-z,A-Z,0-9,_)"
  }
  else if(pss!==cps){
    error.innerHTML="Confirm Password: Must be equal to password"
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
  else if(eid===''){
    error.innerHTML="Email: Cannot be empty"
  }
  else if(!validEmail.test(eid)){
    error.innerHTML="Email: Enter valid EMail"
  }
  else if(phn>=9999999999){
      error.innerHTML="Phone no.: Should Be 10 digits"
  }
  else if(phn%1!==0){
      error.innerHTML="Phone no: Provide integer value"
  }
  else if(phn<=7000000000){
    error.innerHTML="Phone no.: Enter valid number"
  } 
  else if(gen!=="Male"&&gen!=="Female"&&gen!=="Other"){
    error.innerHTML="Gender: Select options"
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
    if(valid){
      setBid(1)
    }
}
const loggedIn=()=>{history.push("/user")}

    return (
        (sessionStorage.length!==0)?<div>{loggedIn()}</div>:
        <>
          <Header/>
          <Menu name="Registration Page"/>
          <div className='container-fluid'>
          <form onSubmit={handleBtnClick} className="col-4 container">
                <div className='form-group'>
                    <label>Username<span style={{color: "red"}}>*</span></label>
                    <input name="username" placeholder="Enter Username" className='form-control'
                         value={userDetails.user.username}
                         onInput={formValidate}
                         onChange={e=>setUserDetails({...userDetails,user:{...userDetails.user,username:e.target.value}})}/>
                </div>
                <div className='form-group'>
                    <label>Password<span style={{color: "red"}}>*</span></label>
                    <input name="password" placeholder="Enter Password" type='password' className='form-control'
                         value={userDetails.user.password}
                         onInput={formValidate}
                         onChange={e=>setUserDetails({...userDetails,user:{...userDetails.user,password:e.target.value}})}/>
                </div>
                <div className='form-group'>
                    <label>Confirm Password<span style={{color: "red"}}>*</span></label>
                    <input name="cpassword" placeholder="Confirm Password" type='password' className='form-control'
                         value={cpass}
                         onInput={formValidate}
                         onChange={e=>setCpass(e.target.value)}/>
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
                    <label>Email<span style={{color: "red"}}>*</span></label>
                    <input name="email" placeholder="Enter Email ID" className='form-control' 
                        value={userDetails.emailId} 
                        onInput={formValidate}
                        onChange={e=>setUserDetails({...userDetails,emailId:e.target.value})}/>
                </div>
                <div className='form-group'>
                    <label>Phone number<span style={{color: "red"}}>*</span></label>
                    <input name="phonenumber" placeholder="Enter your contact number" type='number' 
                    className='form-control' 
                    value={userDetails.phoneno} 
                    onInput={formValidate}
                    onChange={e=>setUserDetails({...userDetails,phoneno:e.target.value})}/>
                </div>
                <div className='form-group'>
                    <label>Gender<span style={{color: "red"}}>*</span></label>
                    <div>
                        <div className="form-check form-check-inline">
                        <input onInput={formValidate} className="form-check-input" type="radio" name="gender" id="genderM" value="Male" onChange={e=>setUserDetails({...userDetails,gender:e.target.value})}/>
                            <label className="form-check-label" htmlFor="genderM">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input onInput={formValidate} className="form-check-input" type="radio" name="gender" id="genderF" value="Female" onChange={e=>setUserDetails({...userDetails,gender:e.target.value})}/>
                            <label className="form-check-label" htmlFor="genderF">
                                Female
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input onInput={formValidate} className="form-check-input" type="radio" name="gender" id="genderO" value="Other" onChange={e=>setUserDetails({...userDetails,gender:e.target.value})}/>
                            <label className="form-check-label" htmlFor="genderO">
                                Other
                            </label>
                        </div>
                    </div>
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
                    <input id="savebutton" type="submit" disabled={!valid} className='btn btn-success mt-2' value="Register"/>
                </div>
                   
            </form>
            <br/><br/><br/><br/>
            <div className="col-4 container">
            <h6 id="error" className="text text-danger"></h6>
            <h6 className="text text-danger">{msg}</h6>
            </div>
          </div>
          <Footer/>

        </>
      )
}
export default Registration
