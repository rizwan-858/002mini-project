import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import FoodItemDetails from '../FoodItemDetails'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class RestaurantDetails extends Component {
  state = {
    detailsApiStatus: apiStatusConstants.initial,
    restaurantDetails: [],
    foodItems: [],
  }

  componentDidMount() {
    this.getRestaurantsDetails()
  }

  getRestaurantsDetails = async () => {
    this.setState({detailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedDetails = [data].map(each => ({
        name: each.name,
        cuisine: each.cuisine,
        location: each.location,
        rating: each.rating,
        imageUrl: each.image_url,
        reviews: each.reviews_count,
        costForTwo: each.cost_for_two,
      }))
      const formattedFoodItems = [data].map(each =>
        each.food_items.map(item => ({
          cost: item.cost,
          foodType: item.food_type,
          id: item.id,
          imageUrl: item.image_url,
          name: item.name,
          rating: item.rating,
        })),
      )
      this.setState({
        detailsApiStatus: apiStatusConstants.success,
        restaurantDetails: formattedDetails,
        foodItems: formattedFoodItems,
      })
    }
  }

  RenderFoodListSuccess = () => {
    const {restaurantDetails, foodItems} = this.state
    return (
      <div className="RestaurantMain">
        <div className="RestaurantBanner">
          <div className="BannerInner">
            <img
              className="BannerImg"
              alt="restaurant"
              src={restaurantDetails[0].imageUrl}
            />
            <ul className="BannerDetails">
              <li>
                <h1 className="BannerName">{restaurantDetails[0].name}</h1>
                <p className="BannerCuisine">{restaurantDetails[0].cuisine}</p>
                <p className="BannerCuisine">{restaurantDetails[0].location}</p>
                <div className="BannerBottom">
                  <div>
                    <div className="RattingANdRupee">
                      <AiFillStar />
                      <p className="BannerRating">
                        {restaurantDetails[0].rating}
                      </p>
                    </div>
                    <p className="BannerReviews">
                      {restaurantDetails[0].reviews}+ Ratings
                    </p>
                  </div>
                  <hr />
                  <div>
                    <div className="RattingANdRupee">
                      <BiRupee />
                      <p className="BannerRating">
                        {restaurantDetails[0].costForTwo}
                      </p>
                    </div>
                    <p className="BannerReviews">Cost for two</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ul className="FoodList">
          {foodItems[0].map(each => (
            <li className="FoodItemCon" testid="foodItem" key={each.id}>
              <FoodItemDetails item={each} />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderFoodItemsList = () => {
    const {detailsApiStatus} = this.state
    switch (detailsApiStatus) {
      case apiStatusConstants.success:
        return this.RenderFoodListSuccess()
      case apiStatusConstants.inProgress:
        return (
          <div
            className="RestaurantsDetailsLoader"
            testid="restaurant-details-loader"
          >
            <div className="products-loader-container">
              <Loader type="Oval" color="#F7931E" height="50" width="50" />
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return <h1>fail</h1>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="DetailsMain">
        <Header activeTab="Home" />
        <div>{this.renderFoodItemsList()}</div>
      </div>
    )
  }
}

export default RestaurantDetails
