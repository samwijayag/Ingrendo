import React, {Component} from 'react';
import InputForm from './Components/InputForm'
import OutputForm from './Components/OutputForm'
import IngredientList from './Components/IngredientList'
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: 'e4c93404d9be4739ae6b173d98ca7a08'
});


const particlesOptions = {
    particles: {
      number: {
        value: 9,
        density: {
          enable: true,
          value_area: 947.0220103698913
        }
      },
      color: {
        value: '#020202'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 3,
          color: '#2a2525'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'top',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
      },
      interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
      },
      retina_detect: true
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      foodItems: [],
    }
  }

  foodIngredients = (data) => {
    const clarifaiFood = data.outputs[0].data.concepts
    this.setState({foodItems: clarifaiFood})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onInputSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models.predict(
        Clarifai.FOOD_MODEL,
        this.state.input)
      .then(response => this.foodIngredients(response))
      .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="App">
       <Particles className='particles'
          params={particlesOptions}
        />
      <InputForm 
        onInputChange={this.onInputChange}
        onInputSubmit={this.onInputSubmit}
        />
      <OutputForm 
        imageUrl={this.state.imageUrl}
        />
      <IngredientList foodItems = {this.state.foodItems}/>
      </div>
    );
  }
}

export default App;
