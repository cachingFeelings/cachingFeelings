import Basics from "./Basics"
import Algorithm from "./Algorithm"
import About from "./About"
import Images from "./Images"
import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage'

const FormInputs = () => {

    //get the current value of page (ie what page the user is on) from the context
    const { page } = useSignUpContext()

    const display = {
        0: <Basics />,
        1: <Algorithm />,
        2: <About />,
        3: <Images />
    }

    //insert the component that corresponds to the page 
    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs