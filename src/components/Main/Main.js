import React, { Component } from "react";
import "./Main.css"
import chars from "../../data/chars.json";
import Header from "../Header/Header.js";
import Character from "../Character/Character.js";
import Instructions from "../Instructions/Instructions.js"

class Main extends Component {
  state = {
    chars,
    score: 0,
    topScore: 0,
    message: "Click an image to begin!"
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
  checkIfClicked = id => {
    this.state.chars.forEach(char => {
      if (char.id === id) {
        if (char.clicked === false) {
          this.markClicked(id);
        } else {
          this.alreadyClicked();
        }
      }
    });
  };
  markClicked = id => {
    let { chars, score, topScore } = this.state;
    let clickAdjusted = chars.map(char => {
      if (char.id === id) {
        char.clicked = true;
      }
      return char;
    });
    let updatedScore = score + 1;
    let updatedTopScore = updatedScore > topScore ? updatedScore : topScore;
    this.setState({
      chars: clickAdjusted,
      score: updatedScore,
      topScore: updatedTopScore,
      message: "You guessed correctly!"
    });
    this.shuffle();
  };
  alreadyClicked = () => {
    console.log("Already clicked that one, you loose!");
    let allUnclicked = this.state.chars.map(char => {
      char.clicked = false;
      return char;
    });
    this.setState(
      {
        score: 0,
        chars: allUnclicked,
        message: "You already clicked that one... Resetting score!"
      },
      () => {
        this.shuffle();
      }
    );
  };

  render() {
    return (
      <div>
        <Header
          score={this.state.score}
          topScore={this.state.topScore}
          message={this.state.message}
        />
        <Instructions closed={this.state.topScore} />
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
                  incorrect={!this.state.score && this.state.topScore}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Main;
