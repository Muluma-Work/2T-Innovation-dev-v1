import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { collection, query, where, getDocs  } from "@firebase/firestore"
import { firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'


export default function NavigationBar() {

       //setting our role
       const [role, setRole] = useState('')
       const {currentUser} = useAuth();
       let currentRole;

       const getUserRole = async () =>{
           const q = query(collection(firestore,'users_roles'), where('uid','==',currentUser.uid));
   
           const querySnapshot = await getDocs(q);
   
           querySnapshot.forEach((doc) =>{
               setRole(doc.data().role)
               currentRole = doc.data().role
           })
       }

       getUserRole();

  return (
    <>
        <nav className="navbar navbar-expand-lg card">
            <div className="container-fluid">
                
                <Link to={'/form'} class="navbar-brand">2T Innovation</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className='nav-items-container'>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className='nav-item' to={"/form"} class="nav-link" aria-current="page">
                                    Complete Form
                                </Link>
                            </li>

                            { 
                                role === 'Admin' ?
                
                                <li className="nav-item">
                                    <Link className='nav-item nav-link' to={"/adminDash"}>
                                        View Dashboard
                                    </Link>
                                </li> : <></>

                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}
