import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onIncrement = () => {
    const {incCount} = this.props
    incCount()
  }

  onDecrement = () => {
    const {decCount} = this.props
    decCount()
  }

  render() {
    const {count} = this.props
    return (
      <div className="btnCon">
        <button
          testid="decrement-count"
          className="btn"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <p className="count" testid="active-count">
          {count}
        </p>
        <button
          testid="increment-count"
          className="btn"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
