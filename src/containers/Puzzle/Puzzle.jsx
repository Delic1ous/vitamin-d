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
      demo: []
    };
  }

  // 2A + 2B TASK SOLUTION (Vitamin component as a visualize)
  inputHandler = event => {
    event.preventDefault();
    console.log(this.input.current.value);
    let vitamins = this.input.current.value.split(" ").map(puzzle => {
      let colorsReqister = puzzle[1] || "Q";
      let colorIndex = colorsReqister.toUpperCase();
      let side = "";
      let filteredColor = "";
      if (puzzle[0] > 2 && puzzle[0] < 7) {
        side = puzzle[0];
      } else {
        side = "error";
      }
      if (["W", "B", "G"].includes(colorIndex)) {
        filteredColor = colorIndex;
      } else {
        side = "error";
      }
      if (puzzle === "") {
        side = "empty";
      }
      return {
        sides: side,
        color: filteredColor
      };
    });

    this.setState({
      vitamins
    });

    this.input.current.value = "";
  };

  // 3B SOLUTION

  demoHandler = (event) => {
    event.preventDefault();
    var counter = -1;
    var timerId = setInterval(() => {
    counter = counter + 1
    let vitamins = this.state.states[counter].split(" ").map(puzzle => {
      return {
        sides: puzzle[0],
        color: puzzle[1]
      };
    });

    this.setState({
      vitamins
    });
    }, 1500);

    setTimeout(function() {
      clearInterval(timerId);
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

  render() {
    return (
      <div>
        <h1>Vitamin Puzzle</h1>
        <button className="demo" onClick={this.demoHandler}>
          Demonstrate
        </button>
        <form action="">
          <div className="form">
            <input
              value={this.state.vitaminsLineInput}
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
