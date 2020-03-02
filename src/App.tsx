import React from 'react'
import './App.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons'


function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">
            Calculator Title
          </h1>
          <p className="subtitle">
            Some description...
          </p>
        </div>
      </section>
      <section>
        <div className="container is-fluid">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-4">
              <div className="tile is-child box">
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span className="icon is-small is-right">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title">Three</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
