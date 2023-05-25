import React, {useState} from 'react'

import { addDoc, collection } from "@firebase/firestore"
import { firestore } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

export default function Dashboard() {

    const {currentUser, signout} = useAuth()
    const navigate = useNavigate()

    // errors
    const [error, setError] = useState("");

    const [houseNumber, setHouseNumber] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname,setSurname] = useState('');
    const [employeeStatus, setEmployeeStatus] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
  
    // Electricity info
    const [meterType, setMeterType] = useState('');
    const [electricityMeterCondition, setElectricityMeterCondition] = useState('');
    const [electricityComment, setElectricityComment] = useState('');
    
    // Water info
    const [accountNumber, setAccountNumber] = useState('');
    const [meterNumber, setMeterNumber] = useState(0); 
    const [meaterReading, setMeterReading] = useState(0);
    const [waterMeterCondition, setWaterMeterCondition] = useState('');
    const [numberOfFlats, setNumberOfFlats] = useState(0);
    const [backRoom, setBackRooms] = useState(0);
    const [accountType, setAccountType] = useState('');
    const [debtorCategory, setDebtorCategory] = useState(''); 
    const [possibleIndigent, setPossibleIndigent] = useState('');
    const[waterComments, setWaterComments] = useState('');

      // Update personal info
      const updatHouseNumber = (e) =>{
        setHouseNumber(e.target.value)
      }
  
      const updateId = (e) =>{
        setId(e.target.value);
      }
  
      const updateOwnerName = (e) =>{
        setName(e.target.value)
      }
  
      const updateSurname = (e) =>{
        setSurname(e.target.value)
      }
  
      const updateEmployeeStatus = (e) =>{
        setEmployeeStatus(e.target.value);
      }
  
      const updateContactNumber = (e) =>{
        setContactNumber(e.target.value);
      }
  
      const updateAddress = (e) =>{
        setAddress(e.target.value);
      }
  
      // Update Electricity Info
      const updateMeterType = (e) =>{
        setMeterType(e.target.value);
      }
  
      const updateElectricityMeterCondidtion = (e) =>{
        setElectricityMeterCondition(e.target.value);
      }
  
      const updateElectricityComments = (e) =>{
        setElectricityComment(e.target.value);
      }
  
      // update Water info
  
      const updateAccountNumber = (e) =>{
        setAccountNumber(e.target.value);
      }
  
      const updateMeterNumber = (e)=>{
        setMeterNumber(e.target.value);
      }
  
      const updateMetertReading = (e) =>{
        setMeterReading(e.target.value);
      }
  
      const updateNumberOfFlats = (e) =>{
        setNumberOfFlats(e.target.value);
      }
  
      const updateBackRooms = (e) =>{
        setBackRooms(e.target.value);
      }
  
      const updateAccountType = (e) =>{
        setAccountType(e.target.value);
      }
  
      const updateDebtorCategory = (e) =>{
        setDebtorCategory(e.target.value)
      }
  
      const updatePossibleIndigent = (e) =>{
        setPossibleIndigent(e.target.value);
      }
  
      const updateWaterComment = (e) =>{
        setWaterComments(e.target.value);
      }
  
      const updateWaterMeterCondidtion = (e) =>{
          setWaterMeterCondition(e.target.value);
      }
  
      // Clear form after submittinfg
      const clearForm = () =>{
  
        //Water information 
        setWaterComments("");
        setWaterMeterCondition("");
        setPossibleIndigent("");
        setDebtorCategory("");
        setAccountType("");
        setNumberOfFlats(0);
        setMeterReading("");
        setAccountNumber("");
        setMeterNumber(0)
  
        // Reset electrcity
        setElectricityComment("");
        setElectricityMeterCondition("");
        setMeterType("");
  
        // Person Info
        setAddress("");
        setContactNumber("");
        setEmployeeStatus("");
        setName("");
        setSurname("")
        setId("");
        setHouseNumber("");
        setBackRooms(0);
  
      }

      const submitForm = () =>{
        // form information
        const ref = collection(firestore, "Users");
    
        let data = {

          currentUser: currentUser.email,  
    
          houseNumber: houseNumber,
          userId: id,
          name: name,
          surname: surname,
          employeeStatus: employeeStatus,
          contactNumber: contactNumber,
          address: address,
    
          meterType: meterType,
          electricityMeterCondition: electricityMeterCondition,
          electricityComment: electricityComment,
    
          accountNumber: accountNumber,
          meaterReading: meaterReading,
          numberOfFlats: numberOfFlats,
          accountType: accountType,
          debtorCategory: debtorCategory,
          possibleIndigent: possibleIndigent,
          waterComments: waterComments,
          waterMeterCondition: waterMeterCondition,
          backRoom: backRoom,
    
        }
    
        try {
            addDoc(ref, data)
            alert('Form submitted successfully')
            //Clear inputs
            clearForm();
    
            //
          } catch(err) {
            alert('Error submitting form')
            console.log(err)
          }
        }

        async function handleLogout(){

        setError("")

        try{
           await signout();
           navigate('/')
        }catch{
            setError("Unable to log out")
        }
      }

      
  

  return (
    
    <>
    <NavigationBar />
    {/* Start of page title */}
    <div className='pagetitle mb-4 mt-4'>
        <h1>2T Innovation and Maquassi Hills Local Municipality</h1>
    </div>

    <div className='row'>

      <div className='col-md-2'>
      </div>

      <div className='col-md-8'>
           
      <div className="card">
        <div className="card-body">
            {error && <Alert variant='danger'>{error}</Alert> }
          <h3 className='card-title'>Personal Info</h3>

          {/* <!-- Floating Labels Form --> */}
          <form className="row g-3">

              {/* Personal Information */}

              {/* Row 1 col with Id number */}
              <div className="col-md-12">

                  {/* Id Number */}
                <div className='form-floating'> 
                    <input type="text" id="IdNumber" className="form-control" maxLength={13} 
                        onChange={updateId} value={id} />
                    
                    <label className="form-label" htmlFor="IdNumber">ID Number</label>
                </div>  
              </div>

              {/* Row 2 cols */}
              <div className="col-md-6">

                {/* Owners Name col 1 */}
                <div className='form-floating'> 
                  <input type="text" id="name" className="form-control" 
                      required onChange={updateOwnerName} value={name} />
                  
                  <label className="form-label" htmlFor="name">Owner's Name</label>
                </div>
              </div>

              {/*Surname col 2*/}
              <div className='col-md-6'>
                  <div className='form-floating'>
                    <input type="text" id="surname" className="form-control" 
                          required onChange={updateSurname} value={surname} />
                    <label className="form-label " htmlFor="surname">Surname</label>
                  </div>
              </div>

              {/* House Number */}
              <div className='col-md-12'>
                  <div className='form-floating'>
                      <input  type='text' className='form-control' id='houseNumber' name='houseNumber' onChange={updatHouseNumber} value={houseNumber} />
                      <label htmlFor='houseNumber'>House Number</label>
                  </div>
              </div>

              {/*Row 2 cols */}
              <div className='col-md-6'> 
                {/* Contact col 1*/}
                <div className='form-floating'>
                  
                    <input onChange={updateContactNumber} value={contactNumber} type="text" 
                      id="contact" className="form-control" required maxLength={10} />    
                    <label className="form-label" htmlFor="contact">Contact number</label>
                </div>
              </div>

              {/* Employee Status col 2*/}
              <div className='col-md-6'>
                {/* <!-- Employment Status --> */}
                <div className='form-floating'>
                  <select name='EmploymentStatus' id='EmploymentStatus'className='form-select'
                      onChange={updateEmployeeStatus} value={employeeStatus} >
                      <option></option>
                      <option value={'Employed'}> Employed </option>
                      <option value={'Unemployed'}>Unemployed</option>
                  </select>

                  
                  <label className="form-label" htmlFor="EmploymentStatus">Employment Status</label>
              </div>
          </div>

          <div className='col-md-12'> 
            {/* Address */}
            <div className='form-floating'>
              <textarea onChange={updateAddress} value={address} className='form-control' rows="4" cols="50">

              </textarea>
              <label className="form-label" htmlFor="address">Address</label>
            </div>

          </div>

          
          <h5 className='card-title' >Electicity Meter</h5>

          {/* Row 2 cols */}

          {/* col 1 */}
          <div className='col-md-6'>
            <div className='form-floating'>
                <select onChange={updateMeterType} value={meterType} name='meterType' 
                    id='meterType'className='form-control'>
                  <option></option>
                  <option value={'Prepaid'}> Prepaid </option>
                  <option value={'Conventional'}>Conventional</option>
                </select>

                <label className="form-label" htmlFor="meterType">Meter Type</label>
            </div>
          </div>

          {/* col 2*/}
          <div className='col-md-6'>
            <div className='form-floating' > 
                <select onChange={updateElectricityMeterCondidtion} value={electricityMeterCondition} 
                    name='meterCondition' id='meterCondition'className='form-control'>
                    <option></option>
                    <option value={'Good'}> Good </option>
                    <option value={'Bad'}>Bad</option>
                </select>
                
              <label className="form-label" htmlFor="meterCondition">Meter Condition</label>
            </div>
          </div>

          {/* Comments Row 1 col */}
          <div className='col-md-12'>
              <div className='form-floating'>
                <textarea onChange={updateElectricityComments} value={electricityComment} id='commentsElectricity' name='commentsElectricity' className='form-control' rows="4" cols="50">

                </textarea>
                <label className="form-label col-3" htmlFor="commentsElectricity">Comments</label>
              </div>
          </div>

          
          <h5 className='card-title' >Water Meter</h5>

          {/* Water Maeter Row Col */}
          <div className='col-md-12'>
            <div className='form-floating'>
              <textarea onChange={updateAccountNumber} value={accountNumber} id='commentsElectricity' name='commentsElectricity' className='form-control' rows="4" cols="50">
                  
              </textarea>
              <label className="form-label col-3" htmlFor="accountNumber">Account number</label>
            </div>
          </div>

          {/* Row 2 cols */}
          
          {/* col 1 */}
          <div className='col-md-6'>
              <div className='form-floating'>
                  
                <input onChange={updateMeterNumber} value={meterNumber} type="number" 
                 id="meterNumber" className="form-control" min={0} />

              <label className="form-label" htmlFor="meterNumber">Meter number</label>
              </div>
          </div>


          {/* col 2 */}
          <div className='col-md-6'>
            <div className='form-floating'> 
                
                <input onChange={updateMetertReading} value={meaterReading} type="number" id="meterreading"
                 className="form-control" min={0} />
                 <label className="form-label" htmlFor="meterreading">Meter Reading</label>
            </div>
          </div>

          {/* Row  col */}
          <div className='col-md-12'>
            <div className='form-floating'> 
                <select onChange={updateWaterMeterCondidtion} value={waterMeterCondition} 
                    name='waterMeterCondition' id='waterMeterCondition'className='form-control'>
                  <option></option>
                  <option value={'Good'}> Good </option>
                  <option value={'Bad'}>Bad</option>
                </select>
                
                <label className="form-label col-3" htmlFor="waterMeterCondition">Meter Condition</label>

            </div>
          </div>

          {/* Row 2 cols */}
          {/*  */}
          <div className='col-md-6'>
              <div className='form-floating'>
                  
                <input onChange={updateNumberOfFlats} value={numberOfFlats} type="number" 
                    id="meterreading" className="form-control" min={0} />
                
                
                <label className="form-label" htmlFor="meterreading">Number of flats</label>
              </div>
          </div>
        
          <div className='col-md-6'>
              <div className='form-floating'>
                
                  <input onChange={updateBackRooms} value={backRoom} type="number" 
                      id="meterreading" className="form-control" min={0} />
                <label className="form-label" htmlFor="meterreading">Back rooms</label>

              </div>
          </div>

          {/* Row 1 col */}
          <div className='col-md-12'>
              <div className='form-floating'>
              <select onChange={updateAccountType} value={accountType} name='waterMeterCondition' id='waterMeterCondition'className='form-control'>
                  <option></option>
                  <option value={'Pay'}>Pay </option>
                  <option value={'Not Pay'}>Not Pay</option>
                </select>

                
            <label className="form-label col-3" htmlFor="waterMeterCondition">Account Type</label>
              </div>
          </div>

          {/* Row 2 cols */}
          <div className='col-md-6' >
            <div className='form-floating'>
            <select onChange={updateDebtorCategory} value={debtorCategory} name='waterMeterCondition' id='waterMeterCondition'className='form-control'>
                  <option></option>
                  <option value={'Business'}> Business </option>
                  <option value={'Residential'}>Residential</option>
                </select>

                
            <label className="form-label" htmlFor="waterMeterCondition">Debtor category</label>
            </div>

          </div>
          <div className='col-md-6'>
            <div className='form-floating'>
            <select onChange={updatePossibleIndigent} value={possibleIndigent} name='waterMeterCondition' id='waterMeterCondition'className='form-control'>
                  <option></option>
                  <option value={'Yes'}> Yes </option>
                  <option value={'No'}>No</option>
                </select>

                <label className="form-label" htmlFor="waterMeterCondition">Possible Indigent</label>
            </div>
            
          </div>

          {/* Row 1 col */}
          <div className='col-md-12'>
            <div className='form-floating'>

              <textarea onChange={updateWaterComment} value={waterComments} 
                  id='meterComments' name='meterComments' className='form-control' rows="4" cols="50">

              </textarea>

              <label className="form-label" htmlFor="meterComments">Comments</label>
            </div>

          </div>

          <div className="text-center">

              <input id='btnSubmit' type="button" onClick={submitForm}
                className="btn btn-primary myspace" value={'Submit'}/>

              <input onClick={clearForm} type="reset" className="btn btn-secondary"Reset/>
            </div>

      </form>

          </div>

      </div>

      </div>

      <div className='col-md-2'>

        <h6 className='card-title'>{currentUser.email}</h6>

      <button onClick={handleLogout} className='btn btn-outline-danger'>
        Log out
      </button>

      </div>
    </div>

  </>
  )
}
