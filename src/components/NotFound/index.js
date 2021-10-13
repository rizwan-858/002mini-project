import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class NotFound extends Component {
  toHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="NotFoundMain">
        <Header activeTab="Home" />
        <div className="NotFoundCon">
          <img
            className="NotImg"
            alt="not found"
            src="https://res.cloudinary.com/rizwan987/image/upload/v1633273078/erroring_1_rxkz0k.png"
          />
          <h1 className="NotHeading">Page Not Found</h1>
          <p className="NotCon">
            we are sorry, the page you requested could not be found Please go
            back to the homepage
          </p>
          <Link to="/">
            <button className="NotFoundBtn" onClick={this.toHome} type="button">
              Home Page
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(NotFound)
