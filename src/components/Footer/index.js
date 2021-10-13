import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="FooterMain">
        <div className="FooterLogoCon">
          <img
            className="FooterLogo"
            alt="website-footer-logo"
            src="https://res.cloudinary.com/rizwan987/image/upload/v1633272401/footerLogo_btgo3d.png"
          />
          <h1 className="footer-heading">Tasty Kitchen</h1>
        </div>
        <p className="Motto">
          The only thing we are serious about is food. Contact us on
        </p>
        <div className="SocialNetworkIcon">
          <FaPinterestSquare testid="pintrest-social-icon" />
          <FaInstagram testid="instagram-social-icon" />
          <FaTwitter testid="twitter-social-icon" />
          <FaFacebookSquare testid="facebook-social-icon" />
        </div>
      </div>
    )
  }
}
export default Footer
