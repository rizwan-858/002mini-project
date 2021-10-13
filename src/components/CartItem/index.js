import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import QuantityCounter from '../QuantityCounter'
import MainContext from '../../context/MainContext'
import './index.css'

class CartItem extends Component {
  renderCartItemCount = name => (
    <MainContext.Consumer>
      {value => {
        const {increaseCount, decreaseCount} = value
        const incItemCount = () => {
          const {item} = this.props
          increaseCount(item.name)
        }
        const decItemCount = () => {
          const {item} = this.props
          decreaseCount(item.name)
        }
        const localList = JSON.parse(localStorage.getItem('cartData'))
        const formattedList = localList === null ? [] : localList
        const itemInCart = formattedList.filter(each => each.name === name)
        return (
          <QuantityCounter
            incCount={incItemCount}
            decCount={decItemCount}
            count={itemInCart[0].count}
            itemName={itemInCart[0].name}
          />
        )
      }}
    </MainContext.Consumer>
  )

  render() {
    const {item} = this.props
    return (
      <div className="CartItemMain">
        <img className="CartItemImg" alt={item.name} src={item.imageUrl} />
        <div className="QuantityAndPrice">
          <h1 className="CartItemName">{item.name}</h1>
          <div className="CounterComp">
            {this.renderCartItemCount(item.name)}
          </div>
          <p className="CartItemCost">
            <BiRupee />
            {item.count * item.cost}.00
          </p>
        </div>
      </div>
    )
  }
}
export default CartItem
