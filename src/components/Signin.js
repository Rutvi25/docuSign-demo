import React from 'react';

const Signin = () => {
  const logout = () => {
    const url =
      `${process.env.REACT_APP_DOCUSIGN_IDENTITY_SERVER}/logout?` +
      `response_type=token&` +
      `scope=${process.env.REACT_APP_IMPLICIT_SCOPES}&` +
      `client_id=${process.env.REACT_APP_INTEGRATION_KEY}&` +
      `redirect_uri=${encodeURIComponent(process.env.REACT_APP_URL)}&` +
      `response_mode=logout_redirect`;
    window.location = url;
  };
  const authenticate = () => {
    const generateId = (n = 40) => {
      var chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var token = '';
      for (var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
      }
      return token;
    };
    const id = generateId();
    window.localStorage.setItem('token', id);
    let redirectUrl;
    if (process.env.REACT_APP_DS_REDIRECT_AUTHENTICATION) {
      // Using redirect the window authentication:
      redirectUrl = process.env.REACT_APP_URL;
    } else {
      // Using new tab authentication
      redirectUrl = `${process.env.REACT_APP_URL}/oauthResponse.html`;
    }
    const url =
      `${process.env.REACT_APP_DOCUSIGN_IDENTITY_SERVER}/oauth/auth?` +
      `response_type=token&` +
      `scope=${process.env.REACT_APP_IMPLICIT_SCOPES}&` +
      `client_id=${process.env.REACT_APP_INTEGRATION_KEY}&` +
      `state=${id}&` +
      `redirect_uri=${encodeURIComponent(redirectUrl)}`;

    if (process.env.REACT_APP_DS_REDIRECT_AUTHENTICATION) {
      window.location = url;
      console.log('>>>login')
    } else {
      console.log('no redirect url');
      // this.oauthWindow = window.open(url, '_blank');
    }
  };

  console.log('>>> url token>>>', window.location.hash);
  const regex =
    /(#access_token=)(.*)(&expires_in=)(.*)(&token_type=)(.*)(&state=)(.*)/;
  const results = regex.exec(window.location.hash)
  console.log('>>> hash:', results)
  if(results) {
    const accessToken = results[2]
    const expiresIn = results[4]
    const incomingState = results[8]
    const stateOk = incomingState === localStorage.getItem('token');
  }
  return (
    <div className='App container'>
      <h1>docuSign demo app</h1>
      <br />
      <button onClick={() => authenticate()}>SignIn</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Signin;
