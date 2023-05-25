import React, { useContext, useEffect, useState } from 'react'
import { auth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] =useState();
    const [role, setRole] = useState("");

    function signup(email, password){

       return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){

        return (
            signInWithEmailAndPassword(auth, email, password).then( function(res){
                
            })
        )
    }


    function signout(){
        return auth.signOut()
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
        })

        return unsubscribe

    }, [])



    const value = {
        currentUser,
        signup,
        signout,
        login
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
 