import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode"


export function App() {
  const [user, setUser] = useState() // in full stack global state

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential)
    // now we decode the token
    var userObject = jwt_decode(response.credential)
    console.log(userObject) // info about the user

    // we save user info
    setUser(userObject)
    // we hide login button
    document.getElementById("signInDiv").hidden = true

  }

  // when sign out, show sign in button, and set user empy object
  function handleSignOut(event) {
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect (()=>{
    // global google, remember about script in html
    google.accounts.id.initialize( // google cllient id -> aud
      {
        client_id: "1058515538107-mgrqpprk5rbvfdlanfhroggc44jh8ln1.apps.googleusercontent.com",
        callback: handleCallbackResponse
      }
    )
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme : "outline", size: "large"}
    )

    google.accounts.id.prompt() // cool additionaa thing
  },[])
  // if we have no user: sign in button
  // if we have user: show the log out button
  return (
    <>
      <h1>cccc</h1>
      <div id="signInDiv"></div>

      {/* we check if user exist, if yes, do not show sign out button 
        so if the first part is true, show the secon &&
      */}
      
      {/* this doesnt work always, figure out how to show logout button */}
      {/* {
        Object.keys(user).length !=0 &&
        <button onClick={ (e) => handleSignOut (e)}> Sign out</button>
      } */}

      
      {/* if user exist show data about user */}
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>

      }

    </>
  )
}