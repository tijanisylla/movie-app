import "./Notification.css";

const Notification = () => {
  return (
    <>
      <div className="notification">
        <div className="notification__container">
          <div className="notification__icon">
            <i className="uil uil-check-circle"></i>
          </div>
          <div className="notification__text">
            <h3>Added to My List</h3>
            <p>Movie has been added to your list</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
