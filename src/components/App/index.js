import React, { Component } from "react";
import "./App.css";
import characters from "../../data/chars.json";
import Header from "../Header";
import Footer from "../Footer";
import Character from "../Character";
import Instructions from "../Instructions";

class Main extends Component {
  state = {
    characters,
    score: 0,
    topScore: 0,
    userMessage: "Click an image to begin!",
    instructionsMessage:
      "Instructions: click characters to get points, but don't click the same one twice, or you'll have to start over again."
  };
  componentDidMount() {
    this.shuffle();
  }
  shuffle = () => {
    if (characters) {
      const shuffledChars = characters.slice();
      for (let i = shuffledChars.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffledChars[i], shuffledChars[rand]] = [
          shuffledChars[rand],
          shuffledChars[i]
        ];
      }
      this.setState({
        characters: shuffledChars
      });
    }
  };
  checkIfClicked = id => {
    this.state.characters.forEach(char => {
      if (char.id === id) {
        if (char.clicked === false) {
          this.handleCorrect(id);
        } else {
          this.handleIncorrect();
        }
      }
    });
  };
  handleCorrect = id => {
    const { characters, score, topScore } = this.state;
    const clickAdjusted = characters.map(char => {
      if (char.id === id) {
        char.clicked = true;
      }
      return char;
    });
    const updatedScore = score + 1;
    const updatedTopScore = updatedScore > topScore ? updatedScore : topScore;
    this.setState(
      {
        characters: clickAdjusted,
        score: updatedScore,
        topScore: updatedTopScore,
        userMessage: "You guessed correctly!"
      },
      () => {
        if (this.state.topScore === 12) {
          this.winGame();
        }
      }
    );
    this.shuffle();
  };
  handleIncorrect = () => {
    const allUnclicked = this.state.characters.map(char => {
      char.clicked = false;
      return char;
    });
    this.setState(
      {
        score: 0,
        characters: allUnclicked,
        userMessage: "You already clicked that one... Resetting score!"
      },
      () => {
        this.shuffle();
      }
    );
  };
  winGame = () => {
    const allUnclicked = this.state.characters.map(char => {
      char.clicked = false;
      return char;
    });
    this.setState({
      characters: allUnclicked,
      instructionsMessage: "You got all 12 in a row, you win!!!",
      topScore: 0,
      score: 0
    });
  };

  render() {
    return (
      <div className="main-contain">
        <Header
          score={this.state.score}
          topScore={this.state.topScore}
          userMessage={this.state.userMessage}
        />
        <Instructions closed={this.state.topScore} instructionsMessage={this.state.instructionsMessage} />
        <div className="container">
          {this.state.characters &&
            this.state.characters.map(char => {
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
        <Footer />
      </div>
    );
  }
}

export default Main;
