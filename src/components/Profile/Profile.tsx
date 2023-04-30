import { useContext } from "react";
import { auth } from "../auth/authMethods";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import ContextAll from "../context/ContextAll";
import "./Profile.css";
import facebook_logo from "../assets/facebook-logo.png";
import google_logo from "../assets/google-logo.png";
import yahoo_logo from "../assets/yahoo-logo.png";
import email_logo from "../assets/email-logo.png";

const Profile = () => {
  const [user] = useAuthState(auth) as null | undefined | any;

  const { setOpenProfile } = useContext(ContextAll) as any;
  const img = auth.currentUser?.providerData[0].photoURL
    ? auth.currentUser?.providerData[0].photoURL
    : ("https://via.placeholder.com/150" as string | undefined);
  return (
    //    profile Modal
    <div className="profile-modal">
      <div className="profile-modal-content">
        <div className="profile-modal-header">
          {/* Icon */}
          <div className="profile-modal-body-icon">
            {
              // Google,Facebook,Yahoo
              user?.providerData[0]?.providerId === "google.com" ? (
                <img src={google_logo} alt="google" />
              ) : user?.providerData[0]?.providerId === "facebook.com" ? (
                <img src={facebook_logo} alt="facebook" />
              ) : user?.providerData[0]?.providerId === "yahoo.com" ? (
                <img src={yahoo_logo} alt="yahoo" />
              ) : (
                <img src={email_logo} alt="email" />
              )
            }
          </div>
          <span
            className="close"
            onClick={() => {
              setOpenProfile(false);
            }}
          >
            &times;
          </span>
        </div>
        <div className="profile-modal-body">
          <div className="profile-modal-body-content">
            <div className="profile-modal-body-content-img">
              <img src={img} alt="profile" />
            </div>
            <div className="profile-modal-body-content-info">
              <h3>{user?.displayName}</h3>
              <p>{user?.email}</p>
              {/* provider */}
              <p>{user?.providerData[0]?.providerId}</p>
            </div>
          </div>
        </div>
        <div className="profile-modal-footer">
          <button
            className="profile-modal-footer-btn"
            onClick={() => {
              signOut(auth);
              setOpenProfile(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
