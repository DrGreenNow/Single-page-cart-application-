import React from "react";
import axios from "axios";

import "./App.css";
import Select from "./components/Select";
import Trash from "./components/Trash";

class App extends React.Component {
  state = {
    items: [],
    isLoading: true,
    total: 0
  };

  componentDidMount = () => {
    axios
      .get(`https://react-my-burger-81f38.firebaseio.com/nodes.json`)
      .then(response => {
        this.setState(state => ({
          items: [...state.items, ...response.data],
          isLoading: false
        }));
      });
  };

  handleDelete = item => {
    const items = this.state.items.filter(m => m.id !== item.id);
    this.setState({ items });
  };

  handleDecrease = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].reqQuantity--;
    this.setState({ items });
  };

  handleIncrease = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].reqQuantity++;
    this.setState({ items });
  };

  sum = item => {
    return item.nodes[item.activeNode].price * item.reqQuantity;
  };

  totalSum = () => {
    let total = 0;
    this.state.items.map(item => {
      return (total += item.nodes[item.activeNode].price * item.reqQuantity);
    });
    return total;
  };

  handleChange = (key, e) => {
    const items = [...this.state.items];
    const index = items.indexOf(key);
    items[index] = { ...key };
    items[index].activeNode = e.target.value;
    this.setState({ items });
  };

  render() {
    return (
      <div className="App">
        {this.state.items.map(item => {
          return (
            <div className="itemWrapper" key={item.id}>
              <div className="imgWrapper">
                <img
                  className="movies_img"
                  src={item.nodes[item.activeNode].img}
                  alt={item.id}
                />
              </div>
              <div className="nameWrapper">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <Select data={item} handleChange={this.handleChange} />
              </div>
              <div className="counterWrapper">
                <button
                  className="myButton"
                  onClick={() => this.handleDecrease(item)}
                  disabled={
                    item.nodes[item.activeNode].skuMinQuantity >=
                    item.reqQuantity
                  }
                >
                  -
                </button>
                <span>{item.reqQuantity}</span>
                <button
                  className="myButton"
                  onClick={() => this.handleIncrease(item)}
                  disabled={
                    item.reqQuantity >=
                    item.nodes[item.activeNode].skuMaxQuantity
                  }
                >
                  +
                </button>
              </div>
              <div className="trashWrapper">
                <Trash onClick={() => this.handleDelete(item)} />
                <p className="ourFont">{this.sum(item)} &euro;</p>
              </div>
            </div>
          );
        })}
        <div className="wrapperSum">
          <p className="ourFont">{this.totalSum()} &euro;</p>
        </div>
      </div>
    );
  }
}

export default App;
