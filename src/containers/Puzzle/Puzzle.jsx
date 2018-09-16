import React, { Component } from "react";
import "./Puzzle.css";

import Vitamins from "../Vitamins/Vitamins";

export class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      vitamins: [],
      states: [],
      demonstration: ''
    };
  }

  // 3B SOLUTION

  demoHandler = event => {
    this.setState({demonstration: 'demonstration'})
    event.preventDefault();
    var counter = -1;
    var timerId = setInterval(() => {
      counter = counter + 1;
      let vitamins = this.state.states[counter].split(" ").map(puzzle => {
        return {
          sides: puzzle[0],
          color: puzzle[1]
        };
      });

      this.setState({
        vitamins,
      });
      
    }, 1500);

    setTimeout(() => {
      clearInterval(timerId);
      this.setState({demonstration: ''})
    }, 17000);
  };

  // 3A TASK SOLUTION
  componentDidMount() {
    // REGULAR 3B SOLUTION
    // -------------------
    // let states = produceStates("3G 4G", [
    //   [4, "G", "B"],
    //   [3, "G", "W"],
    //   [4, "B", "W"]
    // ]);

    // 3B SOLUTION COMBINED WITH 1A
    // ----------------------------

    let states = produceStates("3B 4B 5B 6B", [
      [6, "B", "G"],
      [5, "B", "W"],
      [6, "G", "W"],
      [4, "B", "G"],
      [5, "W", "G"],
      [6, "W", "G"],
      [3, "B", "W"],
      [4, "G", "W"],
      [5, "G", "W"],
      [6, "G", "W"]
    ]);

    function produceStates(initialState, operations) {
      let currentState = initialState;
      return [
        initialState,
        ...operations.map(([size, color, newColor]) => {
          currentState = currentState.replace(
            `${size}${color}`,
            `${size}${newColor}`
          );
          return currentState;
        })
      ];
    }
    this.setState({ states });
  }
  // 2A + 2B TASK SOLUTION (Vitamin component as a visualize)
  inputHandler = event => {
    event.preventDefault();
    let value = this.input.current.value.toUpperCase().split(" ");
    let length = value.length - 1;

    let vitamins = value.map(puzzle => {
      let colorIndex = puzzle[1] || "Q";
      let side = "";
      let filteredColor = "";

      if (puzzle[0] > 2 && puzzle[0] < 7) {
        side = puzzle[0];
      }
      if (["W", "B", "G", ""].includes(colorIndex)) {
        filteredColor = colorIndex;
      } else {
        side = "error";
      }

      return {
        sides: side,
        color: filteredColor
      };
    });

    // VALIDATION BEFORE UPDATING THE STATE
    
    if (value[length] !== "") {
      document.getElementById("input").placeholder = "Play around ;)";
      this.setState({
        vitamins
      });
    } else {
      document.getElementById("input").placeholder = "Be careful with spaces!";
    }
    this.input.current.value = "";
  };


  render() {
    return (
      <div>
        <h1 className={this.state.demonstration}>Vitamin Puzzle</h1>
        <button className={`demo ${this.state.demonstration}`} onClick={this.demoHandler}>
          Demonstrate
        </button>
        <form action="" className={`form ${this.state.demonstration}`}>
          <div className="form-wrapper">
            <input
              id="input"
              type="text"
              ref={this.input}
              placeholder="Example: 3W 4B 5G 6B"
            />
            <button onClick={this.inputHandler}>D</button>
          </div>
        </form>

        <div className="svgWrapper">
          <svg width="960" height="250">
            {this.state.vitamins.map(renderVitamins => (
              <Vitamins
                color={renderVitamins.color}
                sides={renderVitamins.sides}
                key={renderVitamins.sides}
              />
            ))}
          </svg>
        </div>
      </div>
    );
  }
}

export default Puzzle;

// 1A TASK SOLUTION
// input 3B, 4B, 5B, 6B
// Output: [
//     [6 B G] // 6 grey MAXI GREY
//     [5 B W] // 5 white MAXI WHITE
//     [6 G W] // 6 white NEW MAXI WHITE
//     [4 B G] // 4 grey MAXI GREY
//     [5 W G] // 5 grey NEW MAXI GREY
//     [6 W G] // 6 grey NEW MAXI GREY
//     [3 B W] // 3 white MAXI WHITE
//     [4 G W] // 4 white NEW MAXI WHITE
//     [5 G W] // 5 white NEW MAXI WHITE
//     [6 G W] // 6 white NEW MAXI WHITE
// ]
