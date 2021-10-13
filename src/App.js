import {Component} from 'react'
import {Switch, Redirect, BrowserRouter, Route} from 'react-router-dom'
import Login from './components/LoginRoute'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantsDetails'
import NotFound from './components/NotFound'
import MainContext from './context/MainContext'
import './App.css'

const localList = JSON.parse(localStorage.getItem('cartData'))
const formattedData = localList === null ? [] : localList

class App extends Component {
  state = {
    cartList: formattedData,
  }

  clearCartList = () => {
    this.setState({cartList: []})
  }

  onAddToCart = item => {
    const {cartList} = this.state
    this.setState({cartList: [...cartList, item]})
  }

  increaseCount = name => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.name !== name)
    const incList = cartList.filter(each => each.name === name)
    this.setState({
      cartList: [
        ...newList,
        {
          id: incList[0].id,
          cost: incList[0].cost,
          count: incList[0].count + 1,
          imageUrl: incList[0].imageUrl,
          name: incList[0].name,
        },
      ],
    })
  }

  decreaseCount = name => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.name !== name)
    const incList = cartList.filter(each => each.name === name)
    if (incList[0].count > 1) {
      this.setState({
        cartList: [
          ...newList,
          {
            id: incList[0].id,
            cost: incList[0].cost,
            count: incList[0].count - 1,
            imageUrl: incList[0].imageUrl,
            name: incList[0].name,
          },
        ],
      })
    } else {
      this.setState({cartList: [...newList]})
    }
  }

  render() {
    const {cartList} = this.state
    if (cartList.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cartList))
    }
    return (
      <BrowserRouter>
        <MainContext.Provider
          value={{
            cartList,
            onAddToCart: this.onAddToCart,
            increaseCount: this.increaseCount,
            decreaseCount: this.decreaseCount,
            clearCartList: this.clearCartList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <Route path="/bad-path" component={NotFound} />
            <Redirect to="/bad-path" />
          </Switch>
        </MainContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
