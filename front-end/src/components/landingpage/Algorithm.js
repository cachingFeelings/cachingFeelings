import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage.css'

const Algorithm = () => {

    const { data, handleChange } = useSignUpContext()

    const content = (
        <div>
            <div>
            <label htmlFor="lookingFor">Who would you like to be shown?</label>
            <select id="lookingFor" name="showUsersLookingFor" className="form-control" required="">
                <option value="1">People looking for women</option>
                <option value="2">People looking for men</option>
            </select>
            </div>
            <div>
            <label htmlFor="matchWith">Who do you want to date?</label>
            <select id="matchWith" name="matchWith" className="form-control" required="">
                <option value="W">Women</option>
                <option value="M">Men</option>
                <option value="E">Everyone</option>
            </select>
            </div>
        </div>

    )

    return content
}
export default Algorithm