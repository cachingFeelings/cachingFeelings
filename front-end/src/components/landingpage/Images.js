import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage'

const Images = () => {

    const { data, handleChange } = useSignUpContext()



    const content = (
        <div>
            <h3>Upload a picture!</h3>
            <input 
                type="file" 
                name="image" 
                onChange={handleChange} 
            />
        </div>

    )

    return content
}
export default Images