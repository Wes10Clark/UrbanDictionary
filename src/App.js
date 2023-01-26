import "./App.css";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const getDefinition = () => {
    const options = {
      method: "GET",
      url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
      params: { term: word },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
      },
    };
    setIsButtonClicked(true);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setDefinition(response.data.list[0].definition);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 className="text-center">Urban Dictionary</h1>
      <Form
        className="text-center mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          getDefinition();
        }}
      >
        <FormGroup>
          <Label>
            Enter word
            <Input
              className="mt-3"
              placeholder="enter word here"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                if (e.target.value !== { word }) {
                  setIsButtonClicked(false);
                }
              }}
            ></Input>
          </Label>
        </FormGroup>
        <Button onClick={getDefinition}>Get Definition</Button>
      </Form>
      {isButtonClicked && (
        <h3 className="mt-4 mx-3">
          the definition of {word} is: {definition}
        </h3>
      )}
    </div>
  );
}

export default App;
