import React from 'react'
//El css se encuentra en App.css

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            signInEmail : '',
            signInPassword : '',
            error: false,
            error_message : ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://thefacerecognitionapp.herokuapp.com/signin', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }else{
                this.setState({error : true})
                if(user === 'email_error')
                    this.setState({error_message : "Invalid Email"});
                else
                    this.setState({error_message : "Invalid credentials"})
            }
        }).catch(this.setState({error:true, error_message:"An unexpected error occurred"}))
    }
    
    render(){
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-1 mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address" id="email-address" autoFocus
                                onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" name="password"  id="password" 
                                onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p  
                            className="f6 link dim black db pointer"
                            onClick={() => onRouteChange('register')}>Register</p>
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

export default SignIn;