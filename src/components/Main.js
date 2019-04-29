import React, { Component } from "react";
import chars from "../data/chars.json";
import Header from "./Header";
import Character from "./Character.js";

class Main extends Component {
  state = {
    chars,
    score: 0,
    topScore: 0
  };
  componentDidMount() {
    this.shuffle();
  }
  shuffle = () => {
    if (chars) {
      const shuffledChars = chars.slice();
      for (let i = shuffledChars.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffledChars[i], shuffledChars[rand]] = [
          shuffledChars[rand],
          shuffledChars[i]
        ];
      }
      this.setState({
        chars: shuffledChars
      });
    }
  };
  checkIfClicked = (id) =>{
    this.state.chars.forEach(char=>{
      if(char.id === id){
        if(char.clicked === false){
          this.markClicked(id);
        } else{
          this.alreadyClicked();
        }
      }
    })
  }
  markClicked = (id) =>{
    let clickAdjusted = this.state.chars.map(char=>{

      if(char.id === id){
        char.clicked = true;
      }
      return char
    });
    this.setState({
      chars: clickAdjusted
    })
    this.shuffle();
  }
  alreadyClicked = () =>{
    console.log("Already clicked that one, you loose!")
  }

  render() {
    console.log(this.state.chars)
    return (
      <div>
        <Header score={this.state.score} topScore={this.state.topScore} />
        <div className="container">
            {this.state.chars &&
              this.state.chars.map(char => {
                return (
                  <Character
                    key={char.id}
                    id={char.id}
                    image={char.image}
                    name={char.name}
                    clicked={char.clicked}
                    checkIfClicked={this.checkIfClicked}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

export default Main;
