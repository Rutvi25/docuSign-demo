import React from 'react';

const Signin = ({ loggedIn }) => {
  if (window.location.search === '?error=logout_request') {
    window.history.replaceState(null, '', process.env.REACT_APP_URL);
  }
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
    const url =
      `${process.env.REACT_APP_DOCUSIGN_IDENTITY_SERVER}/oauth/auth?` +
      `response_type=token&` +
      `scope=${process.env.REACT_APP_IMPLICIT_SCOPES}&` +
      `client_id=${process.env.REACT_APP_INTEGRATION_KEY}&` +
      `state=${id}&` +
      `redirect_uri=${encodeURIComponent(process.env.REACT_APP_URL)}`;
    window.location = url;
    console.log('>>>login');
  };
  return (
    <div className='App container'>
      <h1>docuSign demo app</h1>
      <br />
      <button onClick={() => authenticate()}>SignIn</button>
    </div>
  );
};

export default Signin;
