import React from "react";

const Card = (props) => {
  return (
    <div className="Card">
      <img className="card--photo" src={props.imageUrl} alt="" />
      <div className="card--right">
        <div className="card--info">
          <div className="card--info--tab">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <h3 className="card--location">{props.location}</h3>
          </div>

          <a className="card--maps" href={props.googleMapsUrl}>
            View on Emin Maps
          </a>
        </div>
        <h1 className="card--title">{props.title}</h1>
        <span>
          {props.startDate}-{props.endDate}
        </span>
        <p className="card--description">{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
