import React, { useState } from 'react';

const Home = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [fileURL, setFileURL] = useState();
  const toBase64 = (file) => {
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onload = () => {
      setFileURL(reader.result);
    };
    reader.onerror = () => {
      console.log('error', error);
    };
  };
  const logout = () => {
    const url =
      `${process.env.REACT_APP_DOCUSIGN_IDENTITY_SERVER}/logout?` +
      `response_type=token&` +
      `scope=${process.env.REACT_APP_IMPLICIT_SCOPES}&` +
      `client_id=${process.env.REACT_APP_INTEGRATION_KEY}&` +
      `redirect_uri=${encodeURIComponent(process.env.REACT_APP_URL)}&` +
      `response_mode=logout_redirect`;
    window.location = url;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
  };
  if (window.location.hash) {
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
      localStorage.setItem('accessToken', accessToken);
      const expiresIn = results[4];
      const incomingState = results[8];
      const stateOk = incomingState === localStorage.getItem('token');
      !stateOk ? console.log('please login again') : console.log('okay!!!');
    }
  }
  const sendEnvelope = () => {
    console.log('send envelope...');
    const requestBody = {
      emailSubject: 'Please sign the attached document',
      status: 'sent',
      recipients: {
        signers: [
          {
            email: email,
            name: name,
            recipientId: '1',
          },
        ],
      },
      documents: [
        {
          name: 'test',
          fileExtension: 'pdf',
          documentId: '1',
          documentBase64: fileURL,
        },
      ],
    };
    console.log(requestBody)
    const url=`${process.env.REACT_APP_DS_BASE_URI}/restapi/v2.1/accounts/${process.env.REACT_APP_DS_ACCOUNT_ID}/envelopes`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((res) => console.log(res.json()))
  };
  return (
    <div className='App container'>
      <h1>docuSign demo app</h1>
      <h3>remote (email) signing</h3>
      <br />
      <button onClick={() => logout()}>Logout</button>
      <br />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendEnvelope();
        }}
      >
        Attach agreement:{' '}
        <input
          required
          type='file'
          accept='application/pdf'
          onChange={(e) => toBase64(e.target.files[0])}
        />
        <br />
        <br />
        Signer's email id:{' '}
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          type='email'
        />
        <br />
        <br />
        Signer's name:{' '}
        <input required onChange={(e) => setName(e.target.value)} type='text' />
        <br />
        <br />
        <button>Send envelope</button>
      </form>
    </div>
  );
};

export default Home;
