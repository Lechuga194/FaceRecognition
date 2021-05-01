import React from 'react'
//El css se encuentra en App.css

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '', 
            password: '',
            error: false
        }
    }

    onNameChange = (event) => {
        this.setState({name : event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password : event.target.value})
    }

    onSubmitRegister = () => {
        const {name, email, password} = this.state;
        fetch('http://localhost:3000/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                name : name,
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then(user => {
            console.log(user)
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('signin');
            }
            else
                this.setState({error : true})
        })
    }

    render(){
        return(
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-1 mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="register" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" name="name"  id="name" onChange={this.onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register now" 
                        onClick={this.onSubmitRegister} />
                    </div>
                    <div>
                        {this.state.error ? 
                            <p className="error"> Ocurrio un error </p> : <p></p>}
                    </div>
                </div>
            </main>
        </article>
        );
    }
}

export default Register;