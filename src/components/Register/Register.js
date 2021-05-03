import React from 'react'
//El css se encuentra en App.css

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '', 
            password: '',
            error: false,
            error_message : ''
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
        fetch('https://thefacerecognitionapp.herokuapp.com/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                name : name,
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else{
                this.setState({error : true})
                let error_message = "";
                switch(user){
                    case 'email_error':
                        error_message = "Invalid Email";
                        break;
                    case 'name_error':
                        error_message = "The name is too short";
                        break;
                    case 'password_error':
                        error_message = "Your password is too short";
                        break;
                    case 'duplicate_email_error':
                        error_message = "The Email is already registered";
                        break;
                    default:
                        error_message = "An unexpected error occurred"
                }
                this.setState({error_message : error_message});
            }
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
                            type="text" name="name"  id="name" autoFocus
                            onChange={this.onNameChange}/>
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
                            <p className="error"> {this.state.error_message} </p> : <p></p>}
                    </div>
                </div>
            </main>
        </article>
        );
    }
}

export default Register;