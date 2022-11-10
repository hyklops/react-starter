const Card = ({ data }: any) => {
  const {
    imageUrl,
    location,
    googleMapsUrl,
    title,
    endDate,
    startDate,
    description,
  } = data;

  return (
    <div className="Card">
      <img className="card--photo" src={imageUrl} alt="" />
      <div className="card--right">
        <div className="card--info">
          <div className="card--info--tab">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <h3 className="card--location">{location}</h3>
          </div>

          <a className="card--maps" href={googleMapsUrl}>
            View on Emin Maps
          </a>
        </div>
        <h1 className="card--title">{title}</h1>
        <span>
          {startDate}-{endDate}
        </span>
        <p className="card--description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
