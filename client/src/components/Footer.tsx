import logo from '../assets/logo.jpg';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaBlog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Content */}
        <div className="footer-top">
          <div className="footer-info">
            <div className="footer-logo-container">
              <img
                src={logo}
                alt="BitBloom Logo"
                className="footer-logo"
              />
              <h4 className="footer-title">BitBloom</h4>
            </div>
            <h5 className="footer-tagline">
              Connect, Create, Collaborate
            </h5>
            <p className="footer-description">
              Join us in exploring, creating, and sharing digital resources that inspire innovation. 
              BitBloom connects developers, creators, and the broader tech community.
            </p>
          </div>

          <div className="footer-links-container">
            <div className="footer-links-column">
              <h6 className="footer-links-title">About</h6>
              <ul className="footer-links-list">
                <li>
                  <a href="#" className="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h6 className="footer-links-title">Legal</h6>
              <ul className="footer-links-list">
                <li>
                  <a href="#" className="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h6 className="footer-links-title">Community</h6>
              <ul className="footer-links-list">
                <li>
                  <a 
                    href="https://github.com/kalviumcommunity/S64_HardikTailor_Capstone_BitBloom" 
                    className="footer-link"
                    target="_blank" 
                    rel="noreferrer"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a 
            href="https://github.com/kalviumcommunity/S64_HardikTailor_Capstone_BitBloom" 
            className="social-icon"
            target="_blank" 
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a href="#" className="social-icon">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="social-icon">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="social-icon">
            <FaDiscord size={24} />
          </a>
          <a href="#" className="social-icon">
            <FaBlog size={24} />
          </a>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom Row */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {year} BitBloom. All rights reserved.</p>
          </div>
          <div className="footer-credits">
            <p>
              Made with ❤ by the BitBloom Team | 
              <a 
                href="https://github.com/kalviumcommunity/S64_HardikTailor_Capstone_BitBloom/issues" 
                className="report-link"
                target="_blank" 
                rel="noreferrer"
              >
                Report Bug
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
