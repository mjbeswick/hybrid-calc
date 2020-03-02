import React, { useRef } from 'react'
import './App.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faBolt } from '@fortawesome/free-solid-svg-icons'
import { HybridCostCalculator } from './models/hybridCostCalculator'
import { useForm } from "react-hook-form"


function App() {
  const { handleSubmit, register, errors } = useForm()
  const modeRef = useRef(new HybridCostCalculator())
  const model = modeRef.current

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

                <div className="field has-addons">
                  <div className="control has-icons-left">
                    <input className="input"  type="number" placeholder="Fuel cost value" name="Fuel cost value" ref={register({ required: true, max: 100, min: 0 })} />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faGasPump} />
                    </span>
                  </div>
                  <div className="control">
                    <select className="input" name="Fuel cost units" ref={register}>
                      <option value="perLitre">£ / Litre</option>
                      <option value="perGallon">£ / Gallon</option>
                    </select>
                  </div>
                </div>

                <div className="field has-addons">
                  <div className="control has-icons-left">
                    <input className="input"  type="number" placeholder="Electricity cost value" name="electricity cost value" ref={register({ required: true, max: 100, min: 0 })} />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faBolt} />
                    </span>
                  </div>
                  <div className="control">
                    <select className="input" name="Electricity cost units" ref={register}>
                      <option value="perKwh">£ / Kwh</option>
                    </select>
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
