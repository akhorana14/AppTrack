import React, { useEffect, useRef,} from 'react';
import Button from 'react-bootstrap/esm/Button';
import {Google} from 'react-bootstrap-icons';

const GOOGLE_IDENTITY_URL = 'https://accounts.google.com/gsi/client';
const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
const scope = [
                'profile',
                'email',
                'https://www.googleapis.com/auth/gmail.readonly'
               ].join(' ');

let scriptLoadingStarted = false;

function GoogleButton(props) {
    return (
        <Button variant="dark" onClick={props.authFunction} className="m-2 d-flex align-items-center">
            <Google style={{"margin-right":"5px"}}></Google> Sign In With Google 
        </Button>
    )
}

function GoogleAuth() {
  const tokenClient = useRef();
  const isGoogleAuthReady = () => {
    return !!window.google?.accounts?.oauth2;
  };

  const doAuth = () => {
    // Use Google Identity Services to request an access token
    tokenClient.current.requestAccessToken({ prompt: 'consent' });
  };

  const onChoose = () => {
    if (!isGoogleAuthReady()) {
      return null;
    }
    doAuth();
    return undefined;
  };

  const onAuthLoad = () => {
    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope,
      callback: async response => {
        if (response.error !== undefined) {
          throw response;
        }
        console.log(response);
      },
    });
  };

  useEffect(() => {
    if (isGoogleAuthReady()) {
      // google api already exists
      // init immediately
      onAuthLoad();
    } else if (!scriptLoadingStarted) {
      // load google api and the init
      scriptLoadingStarted = true;
      loadScript(GOOGLE_IDENTITY_URL, onAuthLoad);
    } else {
      // is loading
    }
  });

  return (
      <GoogleButton authFunction={onChoose} />
  );
}

function loadScript(src, onLoad) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const script = document.createElement('script')
      script.src = src
      script.onload = () => onLoad()
      script.onerror = (err) => reject(err)
      document.body.appendChild(script)
    })
}

export default GoogleAuth;
