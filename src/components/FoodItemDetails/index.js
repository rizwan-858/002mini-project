import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

import MainContext from '../../context/MainContext'
import Counter from '../Counter'

class FoodItemDetails extends Component {
  renderCount = name => (
    <MainContext.Consumer>
      {value => {
        const {cartList, increaseCount, decreaseCount, onAddToCart} = value
        const AddItem = () => {
          const {item} = this.props
          const newItem = {
            cost: item.cost,
            id: item.id,
            imageUrl: item.imageUrl,
            name: item.name,
            count: 1,
          }
          onAddToCart(newItem)
        }

        const incItemCount = () => {
          const {item} = this.props
          increaseCount(item.name)
        }
        const decItemCount = () => {
          const {item} = this.props
          decreaseCount(item.name)
        }
        const itemInCart = cartList.filter(each => each.name === name)
        if (itemInCart.length !== 0) {
          return (
            <Counter
              incCount={incItemCount}
              decCount={decItemCount}
              count={itemInCart[0].count}
            />
          )
        }
        return (
          <button className="AddButton" onClick={AddItem} type="button">
            Add
          </button>
        )
      }}
    </MainContext.Consumer>
  )

  render() {
    const {item} = this.props
    return (
      <div className="ItemMain">
        <img className="ItemImg" alt="foodItem" src={item.imageUrl} />
        <div className="ItemDetailsCon">
          <h1 className="ItemName">{item.name}</h1>
          <div className="RAndR">
            <p className="Cost">
              <BiRupee />
              {item.cost}
            </p>
          </div>
          <div className="RAndR">
            <AiFillStar color="#FFCC00" />{' '}
            <p className="Rating">{item.rating}</p>
          </div>
          <div className="AddCon">{this.renderCount(item.name)}</div>
        </div>
      </div>
    )
  }
}

export default FoodItemDetails
