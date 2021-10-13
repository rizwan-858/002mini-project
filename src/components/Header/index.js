import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    showNavMenu: false,
  }

  onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onShowNav = () => {
    this.setState(prevState => ({
      showNavMenu: !prevState.showNavMenu,
    }))
  }

  render() {
    const {showNavMenu} = this.state
    const {activeTab} = this.props
    return (
      <div className="HeaderMain">
        <div className="HearCon">
          <Link style={{textDecoration: 'none'}} to="/">
            <div className="LogCon">
              <img
                className="LogoImg"
                width={40}
                alt="website logo"
                src="https://res.cloudinary.com/dclxp4bb4/image/upload/v1632732181/tastyKitchen/Group_7420_vfqhmf.png"
              />
              <h1 className="LogoTitle">Tasty Kitchens</h1>
            </div>
          </Link>
          <button
            className="HamburgerBtn"
            onClick={this.onShowNav}
            type="button"
          >
            <GiHamburgerMenu />
          </button>
          <div className="LinksCon">
            <ul className="HeaderItems">
              <li>
                <Link
                  onClick={this.onHome}
                  style={{
                    color: activeTab === 'Home' ? '#F7931E' : '#334155',
                    textDecoration: 'none',
                  }}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={this.onCart}
                  style={{
                    color: activeTab === 'Cart' ? '#F7931E' : '#334155',
                    textDecoration: 'none',
                  }}
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
            </ul>

            <button className="LogOutBtn" onClick={this.onLogOut} type="button">
              Logout
            </button>
          </div>
        </div>
        {showNavMenu ? (
          <div className="SmallMenu">
            <div className="SmallLinks">
              <Link
                onClick={this.onHome}
                style={{
                  color: activeTab === 'Home' ? '#F7931E' : '#334155',
                  textDecoration: 'none',
                }}
                to="/"
              >
                Home
              </Link>
              <Link
                onClick={this.onCart}
                style={{
                  color: activeTab === 'Cart' ? '#F7931E' : '#334155',
                  textDecoration: 'none',
                }}
                to="/cart"
              >
                Cart
              </Link>
            </div>
            <AiFillCloseCircle />
          </div>
        ) : null}
      </div>
    )
  }
}

export default withRouter(Header)
