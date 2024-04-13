import { lastAuth } from "./lastAuth";
import { spotAuth } from "./spotAuth";

const JaZeAuth = () => {
  const { isFMAuthenticated, startAuthFM, fetchFM, logFMOut } = lastAuth();
  const {
    isSpotifyLoggedIn,
    startAuthSpotify,
    fetchSpotifyCode,
    logSpotifyOut,
  } = spotAuth();

  return [
    { isFMAuthenticated, startAuthFM, fetchFM, logFMOut },
    { isSpotifyLoggedIn, startAuthSpotify, fetchSpotifyCode, logSpotifyOut },
  ];
};

export default JaZeAuth;
