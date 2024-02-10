import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";
import ConceptsDisplay from "./components/ConceptsDisplay/ConceptsDisplay";
import ParticlesBg from "particles-bg"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      concepts: [],
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


  render() {
    if (this.state.concepts > 0) {
      document.getElementById("conceptHeading").setAttribute("hidden", false);
      console.log();
    }

    return (
      <div className="App">
        <ParticlesBg className="particles" type="circle" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <ImageDisplay imageURL={this.state.imageURL} />
        <ConceptsDisplay concepts={this.state.concepts} />
      </div>
    );
  }
};

export default App;