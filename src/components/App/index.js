import React, { Component } from "react";
import "./App.css";
import chars from "../../data/chars.json";
import Header from "../Header";
import Footer from "../Footer";
import Character from "../Character";
import Instructions from "../Instructions";

class Main extends Component {
  state = {
    chars,
    score: 0,
    topScore: 0,
    message: "Click an image to begin!", 
    update: "Instructions: click characters to get points, but don't click the same one twice, or you'll have to start over again."
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
        console.log("You clicked " + char.name)
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
    }, ()=>{
      if(this.state.topScore === 12){
        this.winGame();
      }
    })
    this.shuffle();
  };
  alreadyClicked = () => {
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
  winGame = () =>{
    let allUnclicked = this.state.chars.map(char => {
      char.clicked = false;
      return char;
    });
    this.setState({
      chars: allUnclicked,
      update: "You got all 12 in a row, you win!!!", 
      topScore: 0,
      score: 0
    })
  }

  render() {
    return (
      <div className="main-contain">
        <Header
          score={this.state.score}
          topScore={this.state.topScore}
          message={this.state.message}
        />
        <Instructions closed={this.state.topScore} update={this.state.update} />
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
        <Footer />
      </div>
    );
  }
}

export default Main;
