import {Component} from 'react'

import './index.css'

class QuantityCounter extends Component {
  onIncrement = () => {
    const {itemName, incCount} = this.props
    const localList = JSON.parse(localStorage.getItem('cartData'))
    const newList = localList.filter(each => each.name !== itemName)
    const incList = localList.filter(each => each.name === itemName)
    const IncItemCount = [
      ...newList,
      {
        id: incList[0].id,
        cost: incList[0].cost,
        count: incList[0].count + 1,
        imageUrl: incList[0].imageUrl,
        name: incList[0].name,
      },
    ]
    localStorage.setItem('cartData', JSON.stringify(IncItemCount))
    incCount()
  }

  onDecrement = () => {
    const {itemName, decCount} = this.props
    const localList = JSON.parse(localStorage.getItem('cartData'))
    const newList = localList.filter(each => each.name !== itemName)
    const incList = localList.filter(each => each.name === itemName)
    if (incList[0].count > 1) {
      const decItemCount = [
        ...newList,
        {
          id: incList[0].id,
          cost: incList[0].cost,
          count: incList[0].count - 1,
          imageUrl: incList[0].imageUrl,
          name: incList[0].name,
        },
      ]
      localStorage.setItem('cartData', JSON.stringify(decItemCount))
    } else {
      localStorage.setItem('cartData', JSON.stringify([...newList]))
    }
    decCount()
  }

  render() {
    const {count} = this.props
    return (
      <div className="btnCon">
        <button
          testid="decrement-quantity"
          className="btn"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <p className="count" testid="item-quantity">
          {count}
        </p>
        <button
          testid="increment-quantity"
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

export default QuantityCounter
