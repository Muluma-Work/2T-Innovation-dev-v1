import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function NavigationBar() {

    //setting our role
    const [uiRole, setUiRole] = useState();
    const {role} = useAuth()

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
                                role === "Editor" || role === " "  ?
                
                                <li className="nav-item">
                                    <Link className='nav-item' to={"/adminDash"}>
                                        View Dashboard
                                    </Link>
                                </li> : 

                                <li className="nav-item" style={{display: 'none'}} >
                                    <Link className='nav-item' to={"/adminDash"} class="nav-link">
                                        View Dashboard
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}
