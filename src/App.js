import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Button from 'react-bootstrap/Button'
import { Col, Container, Row } from "react-bootstrap";
import FailImage from "./Components/FailImage.js";


class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      // Insert form input state here
      input: "",
      numberOfTries: 10,
      winStatus: false,
      guessButton: "Keep Guessing!",
      roundNumber: 0,
      imageOpacity: 0,
    };
  }

  resetGame = () => {
    this.setState((state) => ({
      currWord: getRandomWord(),
      guessedLetters: [],
      input: "",
      numberOfTries: 10,
      winStatus: false,
      guessButton: "Keep Guessing!",
      imageOpacity: 0, 
    }));
    roundNumber: this.state.roundNumber += 1
    setTimeout(() => {
      this.cheatWord()
    }, 10);
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  onSubmit = (e) => {
    e.preventDefault();


    if (!this.state.input){ // prevent error from an empty submit
      return
    }

    const inputLetter = this.state.input[0].toLowerCase(); // only takes first letter of input
    
    this.setState({
      guessedLetters: [...this.state.guessedLetters, inputLetter], // Logs guesses into array
      numberOfTries: this.state.currWord.includes(inputLetter) ? this.state.numberOfTries: this.state.numberOfTries - 1, // minus tries left only if guess is wrong
      imageOpacity: this.state.currWord.includes(inputLetter) ? this.state.imageOpacity : this.state.imageOpacity + (0.111),
      input: "", // resets input in form for next guess
      
    })

    
    const guessedLetters2 = [...this.state.guessedLetters,inputLetter]
    const currWord2 = [...this.state.currWord]
    let wordGuessed = (currWord2.every(item => guessedLetters2.includes(item)))


    if (wordGuessed === true) {
      this.setState({
        winStatus: true,
        guessButton: "You Won! Click to reset!",
      })
      
    }

    if (this.state.numberOfTries === 1) {
      this.setState({
        guessButton: "Out of tries! Click to reset!"
      })
    }

  }

   handleChange = (e) => { // Necessary for form to work
    let { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount () {
    console.log('start game: ' + this.state.currWord)
  }

  cheatWord () {
    console.log('Cheat: ' + this.state.currWord)
  } 

  render() {
    const disableStatus = this.state.winStatus || this.state.numberOfTries === 0
    console.log(this.state.imageOpacity)
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
               <h1>Guess The Word 🚀</h1>
               <h2>Round Number : {this.state.roundNumber}</h2>
            </Row>
            <Row>
              <Col>
              <h3>Word Display</h3>
               {this.generateWordDisplay()}
              </Col>
              <Col>
              <h3>Guessed Letters</h3>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.toString()
                  : "-"}
              </Col>
            </Row>
            <Row>
              <h3>Number of Tries</h3>
                <h4>{this.state.numberOfTries}</h4>
            </Row>
          </Container>
          <h3 style={{color: '#fcba03'}}>Guess 1 letter at a time!</h3>
          {/* Insert form element here */}
            <form onSubmit={this.onSubmit}>
              
              <input type='text' 
              name ='input' 
              value={this.state.input}
              onChange={this.handleChange}
              disabled={disableStatus}
              />

            {/* <input type='submit' value='submit' disabled={disableStatus}/> Creates the button to submit */}
            <br />
            <Button variant="success" as="input" type="submit" value="Submit" disabled={disableStatus} />
            <br />
            <Button variant="primary" onClick={this.state.numberOfTries <= 0 || this.state.winStatus ? this.resetGame: null}>{this.state.guessButton}</Button>
            <div>{this.state.winStatus ? "YOU GUESSED THE WORD!": ""}</div>

            </form>
            <FailImage opacity={this.state.imageOpacity}/>
          
          {/* Todo: Insert form element here */}
        </header>
      </div>
    );
  }
}

export default App;
