import React from 'react'
import '../styles/components/Login.scss';

function Login() {

  return (
    <React.Fragment>

{/* LOGIN FORM */}
        <section className="login">
            
            <header className="login__header">
                <h1 className="login__title">Login</h1>
            </header>

            <form className="login-frm" onSubmit={event => this.props.handleSubmit(event)}>

                <div>
                    <label className="login-frm__emaillabel" htmlFor="loginEmail">Email</label>
                    <input 
                    className="login-frm__email" 
                    type="email" 
                    onChange={event => this.props.handleChange(event)}
                    name="loginEmail" 
                    required />
                    <span className="validity"></span>
                </div>

                <div>
                    <label className="login-frm__passwordlabel" htmlFor="loginPassword">Password</label>
                    <input 
                    className="login-frm__password" 
                    type="password" 
                    onChange={event => this.props.handleChange(event)}
                    name="loginPassword"
                    required />
                    <span className="validity"></span>
                </div>

                <button type="submit" className="login-frm__submit btn btn__submit">Log in</button>
            </form>
        </section>

{/* REGISTRATION FORM */}
        <section className="registration">
            
            <header className="registration__header">
                <h2 className="registration__title">Register</h2>
            </header>

            <form className="registration-frm" onSubmit={event => this.props.handleSubmit(event)}>

                <div>
                    <label className="registration-frm__namelabel" htmlFor="firstName">Name</label>
                    <input
                    className="registration-frm__name" 
                    onChange={event => this.props.handleChange(event)}
                    type="text" name="firstName" 
                    pattern="[A-Za-z]{3,}" required /><span className="validity"></span>
                </div>

                <div>
                    <label className="registration-frm__emaillabel" htmlFor="registrationEmail">Email</label>
                    <input 
                    className="registration-frm__email"  
                    type="email" 
                    onChange={event => this.props.handleChange(event)}
                    name="registrationEmail" 
                    value={} 
                    required /><span className="validity"></span>
                </div>

                <div>
                    <label className="registration-frm__passwordlabel" htmlFor="registrationPassword">Password</label>
                    <input 
                    className="registration-frm__password" 
                    type="password" 
                    onChange={event => this.props.handleChange(event)}
                    name="registrationPassword" 
                    required /><span className="validity"></span>
                </div>

                <button type="submit" className="registration-frm__submit btn btn__submit">Register</button>
            </form>
        </section>

    </React.Fragment> 
  )
}

export default Login;