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

  const handleSignUp = async (e) => {
    e.preventDefault() //remove later
    console.log("Data being sent to the backend: "); 
    console.log(JSON.stringify(data)); 
  
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:42069/api/user/create_user/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    });
    } catch (err) {

    }
  }

  return (
    <div>
      <TwinklingBackground />
      <div className="form-container" data-page="signup">
        <h3>{title[page]}</h3> 
        <form>
            <FormInputs />
        </form>
      <div style={{marginTop: "20px", display: "flex", justifyContent: "space-between"}}className="button-container">
              <button type="button" className={`form-button ${prevHide} `} onClick={handlePrev} disabled={disablePrev}>Prev</button>
              <button type="button" className={`form-button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>
      </div>
        <button 
              style={{marginTop: "20px"}}
              type="submit" 
              className={`form-button ${submitHide ? 'offscreen' : ''}`} 
              disabled={!canSubmit} 
              onClick={handleSignUp}>
                Submit
        </button>
        </div>
    </div>
  );
}; 

export default SignupForm;