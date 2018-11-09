import React from "react";

function Home ({handleClick}) {
  return (
    <React.Fragment>
      
        <h2>SPLASH</h2>
        <button onClick={()=>handleClick('login')} className="login btn btn__login">Login / Register</button>
        <button onClick={()=>handleClick('your-trips')} className="your__trips btn btn__link">Your trips</button>
        <button onClick={()=>handleClick('create-trip')} className="create__trip btn btn__link">Create a trip</button>

    </React.Fragment>
  )
}

export default Home;