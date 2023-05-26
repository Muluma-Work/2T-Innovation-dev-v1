import React, {useState, useEffect} from 'react'

import { getDocs, collection } from "@firebase/firestore"
import { firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import {auth} from '../firebase'
import * as FileSaver from "file-saver"; //New implementation
import * as XLSX from "xlsx"; // New implementation
import { useAuth } from '../contexts/AuthContext';
import NavigationBar from './NavigationBar';

export default function AdminDashboard() {

    const [forms, setForms] = useState([]);
    const [error, setError] = useState("");
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    
    const [userCounts, setUserCounts] = useState({});

    // Cout number of forms submitted
    // const countSubmissionsByUser = () => {

    //     const counts = {}

    //     forms.forEach( (form) =>{

    //       const formCurrentUser = form.currentUser;

    //       if(counts[formCurrentUser]){
    //         counts[formCurrentUser]++;
    //       }else{
    //         counts[formCurrentUser] = 1
    //       }

    //     })

    //     return counts;
   
    // }

    // Employment status
    let employed = 0;
    let unemployed = 0;
  
    // Debtor Category
    let businessRes = 0;
    let residentialRes = 0;
  
    // Electricity meter info
    let electricityPrepaid = 0;
    let electricityConventional = 0;
    let electricityMeterGoodCondition = 0;
    let electricityMeterBadCondition = 0;
  
    // Water meter information
    let waterMeterGoodCondidtion = 0;
    let waterMeterBadCondidtion = 0;

    const fetchPost = async () => {
       
        await getDocs(collection(firestore, "Users")).then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(), 
                    id:doc.id 
                }));
  
                setForms(newData);
                
                const userCounts = countSubmissionsByUser();
                setUserCounts(userCounts);
                
            } 
        )
    }

    useEffect(()=>{

        fetchPost()

    }, []);

    //New Implemetation
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "2T Innovation Data Collection";
    const fileExtention = ".xlsx"

      function exportToExcel(){
      const ws = XLSX.utils.json_to_sheet(forms);
      const wb = {Sheets: {data: ws }, SheetNames: ["data"]};
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtention);
      }

    forms.forEach((form) =>{

        if(form.employeeStatus === "Employed"){
          //  counting emplyed people
            employed = employed +1;
            
        }else if(form.employeeStatus === "Unemployed"){
            // Counting unemplyed people
            unemployed = unemployed + 1;
        }
  
        if(form.debtorCategory === "Business"){
          // Counting business res
            businessRes = businessRes + 1;
        }else if(form.debtorCategory === "Residential"){
          // Counting resdidential 
            residentialRes = residentialRes + 1 
        }
  
        if(form.meterType === "Prepaid"){
          //Conting prepaid
          electricityPrepaid = electricityPrepaid + 1;
  
        }else if(form.meterType === "Conventional"){
          // Counting Conventional
          electricityConventional = electricityConventional +1;
        }
  
        if(form.electricityMeterCondition === "Good"){
            // Conting good condition
            electricityMeterGoodCondition = electricityMeterGoodCondition + 1;
        }else if(form.electricityMeterCondition === "Bad"){
            // Counting bad condition
            electricityMeterBadCondition = electricityMeterBadCondition + 1;
        }
  
        if(form.waterMeterCondition === "Good"){
          waterMeterGoodCondidtion = waterMeterGoodCondidtion + 1;
        }else if(form.waterMeterCondition === "Bad"){
          waterMeterBadCondidtion = waterMeterBadCondidtion +1;
        }
  
      })

      async function handleLogout(){

        setError("")

        try{
          //  await signout();
          auth.signOut()
           navigate('/')
        }catch{
            setError("Unable to log out")
        }
      }

      const countSubmissionsByUser = () => {
        const counts = {};
        forms.forEach((form) => {
          const formCurrentUser = form.currentUser;
    
          if (counts[formCurrentUser]) {
            counts[formCurrentUser]++;
          } else {
            counts[formCurrentUser] = 1;
          }
        });

        return counts;
      }



  return (  
    <>
      <NavigationBar />

      <div className='pagetitle mt-4'>
          <h1>Admin Dashboard</h1>
      </div>  

      <div className='row'>
          {error && <Alert variant='danger'>{error}</Alert> }
        <div className='col-md-2 mt-4'>

      </div>

      <div className='col-md-8'>
{/* Account Details */}
<section className="section mt-4">

    <div className='row'>

      <div className='col-lg-6'>
        <div className='text-center'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Export to Excel</h5>
                <button onClick={exportToExcel} className='btn btn-outline-primary'> Export </button>
              </div>
            </div>
          </div>
      </div>

      <div className='col-lg-6'>
        <div className='text-center'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Forms Submmited </h5>
              <p>{forms.length}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className="row">
      <p className='card-title text-center'>Employment Status</p>
      <div className="col-lg-6">
      <div className='text-center'>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Unemployed</h5>
            <p>{unemployed}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-6">
    <div className='text-center'>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Employed</h5>
            <p>{employed}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div className='row'>
  <p className='card-title text-center'>Debtor's Category</p>
  <div className="col-lg-6">
  <div className='text-center'>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Business</h5>
        <p>{businessRes}</p>
      </div>
    </div>
    </div>
    </div>

    <div className="col-md-6">
      <div className='text-center'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Residential</h5>
          <p>{residentialRes}</p>
        </div>
      </div>
      </div>
    </div>

  </div>
</section>

{/* Water and Electricity */}
<div className='row'>

   {/* Electricity Informatio */}
   <div className='col-lg-12'>

       <div className='card'> 
           <div className='card-body'>
               <div className='card-title text-center'> Electricity Meter Information </div>

               <table className="table table-hover">
                   <thead className='text-center'>
                       <tr>
                       <th scope="col">Prepaid</th>
                       <th scope="col">Conventional</th>
                       <th scope="col">Good Condition</th>
                       <th scope="col">Bad Condition</th>
                       </tr>
                   </thead>


                   <tbody className='text-center'>
                       <tr>
                       <td>{electricityPrepaid}</td>
                       <td>{electricityConventional}</td>
                       <td>{electricityMeterGoodCondition}</td>
                       <td>{electricityMeterBadCondition}</td>
                       </tr>
                   </tbody>
               </table>
           </div>

       </div>
       
   </div>
   

   {/* Water Meter Infomation */}
   <div  className='col-lg-12'>
   <div className='card'> 
           <div className='card-body'>
               <div className='card-title text-center'> Water Meter Information </div>

               <table className="table table-hover">
                   <thead className='text-center' > 
                       <tr>
                       
                       <th scope="col">Good Condition</th>
                       <th scope="col">Bad Condition</th>
                       </tr>
                   </thead>


                   <tbody className='text-center'>
                       <tr>
                       
                       <td>{waterMeterGoodCondidtion}</td>
                       <td>{waterMeterBadCondidtion}</td>
                       </tr>
                   </tbody>
               </table>
           </div>

       </div>
       
   </div>

</div>
<div className='row'>
    <div className='col-lg-12'>
    <div className='card'> 
           <div className='card-body'>
               <div className='card-title text-center'>Individual User Performance</div>

               <table className="table table-hover">
                   <thead>
                       <tr>
                          <th scope="col">User Email</th>
                          <th scope="col">Number of forms submitted</th>
                       </tr>
                   </thead>
                   <tbody >
                      {Object.entries(userCounts).map(([currentUser, count]) => (
                        <tr key={currentUser}>
                          <td>{currentUser}</td>
                          <td className='text-center'>{count}</td>
                        </tr>
                      ))}
                   </tbody>
               </table>
           </div>

       </div>
    </div>
</div>   
      </div>

   <div className='col-md-2 mt-4'>
      <div className='text-center'>
        <h6 className='card-title'>{currentUser.email}</h6>
        <button onClick={handleLogout} className='btn btn-outline-danger'>Log out</button>
      </div>
   </div>

</div>

</>
  )
}
