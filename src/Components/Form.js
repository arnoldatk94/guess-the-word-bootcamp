import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guessedLetters: "",
    };
  }

  handleChange = (e) => {
    let {name,value} = e.target;

    this.setState({
      [name]: value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
      this.setState({
        guessedLetters: this.state.guessedLetters
      })
  }

  render() {
    return (
      <div>

        <form>
          <label>Letters guessed: </label>
          <input 
            type='text' 
            name ='guessedLetters' 
            value={this.state.guessedLetters} 
            onChange={this.handleChange}/>
            <br />

            <input type="submit" value="submit" />
        </form>
        {this.state.guessedLetters}
      </div>
    )
  }
}
