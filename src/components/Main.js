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
                    markClicked={this.markClicked}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

export default Main;
