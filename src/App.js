import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";
import ConceptsDisplay from "./components/ConceptsDisplay/ConceptsDisplay";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      concepts: [],
      route: "signin",
      isSignedIn: false
    }
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  returnClarifaiRequestOptions = (imageURL) => {
    const PAT = "5a18532a1ae24de9adda0da723753734";
    const USER_ID = "raymondt1234";
    const APP_ID = "general-image-recognition-project";
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
              // "base64": IMAGE_BYTES_STRING
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Key " + PAT
      },
      body: raw
    };

    return requestOptions;
  }


  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input })

    fetch("https://api.clarifai.com/v2/models/general-image-recognition/outputs", this.returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => this.setState({ concepts: result.outputs[0].data.concepts }))
      .catch(error => console.log("error", error));
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false })
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { route, imageURL, concepts, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" type="circle" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === "home"
            ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <ImageDisplay imageURL={imageURL} />
              <ConceptsDisplay concepts={concepts} />
            </div>
            : (
              this.state.route === "signin"
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
};

export default App;