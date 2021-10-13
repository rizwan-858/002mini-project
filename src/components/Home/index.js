import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {MdSort} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersApiStatus: apiStatusConstants.initial,
    restaurantsApiStatus: apiStatusConstants.initial,
    offersList: [],
    restaurantsList: [],
    limit: 9,
    activePage: 1,
    initialSortValue: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getBanners()
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({restaurantsApiStatus: apiStatusConstants.inProgress})
    const {activePage, limit, initialSortValue} = this.state
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${initialSortValue}&offset=${offset}&limit=${limit}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      methods: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.restaurants.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
        name: each.name,
        rating: each.user_rating.rating,
        cuisine: each.cuisine,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: formattedData,
        restaurantsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({restaurantsApiStatus: apiStatusConstants.failure})
    }
  }

  getBanners = async () => {
    this.setState({offersApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        offersApiStatus: apiStatusConstants.success,
        offersList: formattedData,
      })
    } else {
      console.log('error')
    }
  }

  renderOfferSuccess = () => {
    const settings = {
      dots: true,
    }
    const {offersList} = this.state
    return (
      <div className="OffersMain">
        <div className="OffersList">
          <Slider {...settings}>
            {offersList.map(each => (
              <li key={each.id}>
                <img className="OfferImg" alt="offer" src={each.imageUrl} />
              </li>
            ))}
          </Slider>
        </div>
      </div>
    )
  }

  renderOffers = () => {
    const {offersApiStatus} = this.state
    switch (offersApiStatus) {
      case apiStatusConstants.success:
        return this.renderOfferSuccess()
      case apiStatusConstants.inProgress:
        return (
          <div className="OffersLoader" testid="restaurants-offers-loader">
            <div className="products-loader-container">
              <Loader type="Oval" color="#F7931E" height="50" width="50" />
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div>
            <h1>Fail</h1>
          </div>
        )

      default:
        return null
    }
  }

  onForward = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurants,
      )
    }
  }

  onBackward = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurants,
      )
    }
  }

  renderRestaurantListSuccess = () => {
    const {restaurantsList} = this.state
    return (
      <div className="RestaurantsMainCon">
        <ul className="RestaurantsCon">
          {restaurantsList.map(each => (
            <li className="Item" testid="restaurant-item" key={each.id}>
              <Link
                style={{textDecoration: 'none'}}
                to={`/restaurant/${each.id}`}
              >
                <div className="RestaurantItemCon">
                  <img
                    className="RestaurantImage"
                    alt="restaurant"
                    src={each.imageUrl}
                  />
                  <div className="DetailsCon">
                    <h1 className="RestaurantName">{each.name}</h1>
                    <p className="FastFood">{each.cuisine}</p>
                    <div className="RatingCon">
                      <AiFillStar color="#FFCC00" />{' '}
                      <p className="Rating">{each.rating}</p>
                    </div>
                    <p className="Rating">Reviews: {each.totalReviews}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurantsList = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantListSuccess()
      case apiStatusConstants.inProgress:
        return (
          <div className="OffersLoader" testid="restaurants-list-loader">
            <div className="products-loader-container">
              <Loader type="Oval" color="#F7931E" height="50" width="50" />
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div>
            <h1>Fail</h1>
          </div>
        )

      default:
        return null
    }
  }

  onChangeSort = event => {
    this.setState({initialSortValue: event.target.value}, this.getRestaurants)
  }

  render() {
    const {initialSortValue, activePage} = this.state
    return (
      <div className="HomeMain">
        <Header activeTab="Home" />
        {this.renderOffers()}
        <div className="DealsMain">
          <h1 className="DealsHeading">Popular Restaurants</h1>
          <div className="SelectAndSort">
            <p className="Caption">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="SortCon">
              <MdSort color="#475569" />
              <p className="Caption">Sort by </p>
              <select
                className="Select"
                onChange={this.onChangeSort}
                value={initialSortValue}
              >
                {sortByOptions.map(each => (
                  <option value={each.value} key={each.id}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          {this.renderRestaurantsList()}
        </div>
        <div className="PageNav">
          <button
            className="PageBtn"
            testid="pagination-left-button"
            onClick={this.onBackward}
            type="button"
          >
            <IoIosArrowBack />
          </button>
          <div className="page">
            <p testid="active-page-number">{activePage}</p>{' '}
            <p className="of"> of </p>
            <p>4</p>
          </div>
          <button
            className="PageBtn"
            testid="pagination-right-button"
            onClick={this.onForward}
            type="button"
          >
            <IoIosArrowForward />
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
