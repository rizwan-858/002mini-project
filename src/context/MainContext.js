import React from 'react'

const MainContext = React.createContext({
  cartList: [],
  onAddToCart: () => {},
  increaseCount: () => {},
  decreaseCount: () => {},
  clearCartList: () => {},
})

export default MainContext
