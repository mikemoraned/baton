import React from "react";
import PropTypes from "prop-types";
import "./Game.css";
import QRCode from "qrcode.react";
import { withContentRect } from "react-measure";

const MAX_SIZE = 600;
const ExpandingQRCode = withContentRect("bounds")(({ measureRef, contentRect, url }) => {
  const size = Math.min(contentRect.bounds.width, MAX_SIZE);
  return <div ref={measureRef}>
    <QRCode value={url} size={size}/>
  </div>;
});

const Game = ({url}) => {
  return <div className="card">
    <div className="card-image">
      <figure className="image is-4by4">
        <ExpandingQRCode url={url}/>
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">John Smith</p>
          <p className="subtitle is-6">@johnsmith</p>
        </div>
      </div>

      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br />
        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>;
};

Game.propTypes = {
  url: PropTypes.string.isRequired
};

export default Game;