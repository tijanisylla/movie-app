import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const yeareDate: Date = new Date();
  const thisYear: number = yeareDate.getFullYear();
  return (
    <footer className="footer">
      <div className="footer__container">
        <h1 className="footer__title">Tijani Sylla</h1>

        <ul className="footer__list">
          <li>
            <a href="/#" className="footer__link">
              Home
            </a>
          </li>
          <li>
            <a href="#filter" className="footer__link">
              Movies
            </a>
          </li>
          <li>
            <a href="#filter" className="footer__link">
              Tv-Series
            </a>
          </li>
        </ul>
        <div className="footer__social">
          <a
            href="https://www.linkedin.com/in/tijanisylla"
            target={"_blank"}
            rel="noreferrer"
            className="footer__social-link"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://github.com/tijanisylla"
            className="footer__social-link"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
          <a
            href="https://instagram.com/tijani__sylla/"
            className="footer__social-link"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href="https://twitter.com/Youngsylla2"
            className="footer__social-link"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="bx bxl-twitter"></i>
          </a>
        </div>
        <span className="footer__copy">
          &#169; Copyright {"  "} {thisYear}. {"  "}All rigths reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
