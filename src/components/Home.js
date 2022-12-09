import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const logout = () => {
    const url =
      `${process.env.REACT_APP_DOCUSIGN_IDENTITY_SERVER}/logout?` +
      `response_type=token&` +
      `scope=${process.env.REACT_APP_IMPLICIT_SCOPES}&` +
      `client_id=${process.env.REACT_APP_INTEGRATION_KEY}&` +
      `redirect_uri=${encodeURIComponent(process.env.REACT_APP_URL)}&` +
      `response_mode=logout_redirect`;
    window.location = url;
    localStorage.removeItem('accessToken')
    localStorage.removeItem('token')
  };
  if (window.location.hash) {
    console.log('navigate');
    console.log('>>> url token>>>', window.location.hash);
    const regex =
      /(#access_token=)(.*)(&expires_in=)(.*)(&token_type=)(.*)(&state=)(.*)/;
    const results = regex.exec(window.location.hash);
    console.log('>>> hash:', results);
    const homeUrl = window.location.href.substr(
      0,
      window.location.href.indexOf('#')
    );
    window.history.replaceState(null, '', homeUrl);
    if (results) {
      const accessToken = results[2];
      localStorage.setItem('accessToken', accessToken)
      const expiresIn = results[4];
      const incomingState = results[8];
      const stateOk = incomingState === localStorage.getItem('token');
      !stateOk ? console.log('please login again') : console.log('okay!!!')
    }
  }
  return (
    <div className='App container'>
      <h1>docuSign demo app</h1>
      <br />
      <button onClick={() => logout()}>Logout</button>
      <br />
      <p>Send an envelope with a remote (email) signer</p>
      Signer's email id: <input type='text' />
      <br />
      <br />
      Signer's name: <input type='text' />
      <br />
      <br />
      <button>Send envelope</button>
    </div>
  );
};

export default Home;
