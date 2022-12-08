import React from 'react'

const Home = () => {
  return (
    <div className='App container'>
      <h1>docuSign demo app</h1>
      <br />
      <p>Send an envelope with a remote (email) signer</p>
      Signer's email id: <input type='text' />
      <br /><br />
      Signer's name: <input type='text' />
      <br /><br />
      <button >Send envelope</button>
    </div>
  )
}

export default Home