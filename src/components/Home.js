import React from "react";

function Home ({handleClick}) {
  return (
    <React.Fragment>
        <p>This is Home.js</p>
        <p onClick={()=>handleClick('login')}>Login / Register</p>
        <p onClick={()=>handleClick('your-trips')}>Your Trips</p>
        <p onClick={()=>handleClick('create-trip')}>Create Trip</p>
    </React.Fragment>
  )
}

export default Home;