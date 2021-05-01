import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css';

//Introduce tu KEY de CLARIFAI aquí
const app = new Clarifai.App({
 apiKey: 'KEY'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn : false ,
      user : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box =  {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
    this.displayFaceBox(box);
    return box;
  }

  /**
   * Metodo que se encarga de dibujar la caja donde se encuentra el rostro
   * @param {Object} box 
   */
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  //Image submit
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        //Aumentamos las entries del usuario si hay respuesta 
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          }).then(user => user.json())
          .then(user => this.loadUser(user))
        }
        this.calculateFaceLocation(response)
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'home') 
      this.setState({isSignedIn: true})
    else
      this.setState({isSignedIn: false})
    this.setState({route: route});
  }

  render() {
    const { imageUrl, route, box, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles'/>
        <div className="navBar">
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        </div>
        {
          route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : (
          route === 'register' ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> :
          <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>)
        }
      </div>
    );
  }
}

export default App;
