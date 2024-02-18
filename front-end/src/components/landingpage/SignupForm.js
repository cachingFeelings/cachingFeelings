import React from 'react'
import './LandingPage.css'
import useSignUpContext from '../../hooks/useSignUpContext'
import FormInputs from './FormInputs.js'
import TwinklingBackground from './TwinkleBackground/TwinkleBackground.js';


const SignupForm = () => {

  const {
    page,
    setPage,
    data,
    title,
    canSubmit,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide
  } = useSignUpContext()

  const handlePrev = () => setPage(prev => prev - 1)

  const handleNext = () => setPage(prev => prev + 1)

  const handleSubmit = e => {
    e.preventDefault() //remove later
    console.log(JSON.stringify(data))
  }

  return (
    <div>
    <TwinklingBackground />
    <div className="form-container" data-page="signup">
      <form onSubmit={handleSubmit}>
        <header className="form-header">
          <h3>{title[page]}</h3> 
          <FormInputs />
          <div className="button-container">
            <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>
            <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>
            <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button>
          </div>
        </header>
      </form>
    </div>
    </div>
  );
}; 

export default SignupForm;