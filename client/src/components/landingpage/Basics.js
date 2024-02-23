import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage.css'
import { useEffect, useState } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-Za-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Basics = () => {

    const { data, handleChange } = useSignUpContext()

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    useEffect( () => {
        setValidName(USER_REGEX.test(user)); 
    }, [user])

    useEffect( () => {
        setValidPwd(PWD_REGEX.test(pwd)); 
        setValidMatch(pwd === matchPwd); 
    }, [pwd, matchPwd])

    const content = (
        <div className="basics-div">
            <input
                className="basic-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                pattern="([A-Z])[\w+.]{1,}"
                value={data.username}
                onChange={e => {handleChange(e); setUser(e.target.value); }}
                //onBlur={checkUsername}
            />
            {/* <p id="uidnote" className={!validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p> */}
            <label className="basic-label" htmlFor="birthday">Birthday</label>
            <input
                className="basic-input"
                type="date"
                id="birthday"
                name="birthday"
                placeholder="Birthday (MM/DD/YYYY)"
                pattern="\d{2}\/\d{2}\/\d{4}"
                value={data.birthday}
                onChange={handleChange}
            />
            <input
                className="basic-input"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                pattern="[\w\d\s.#]{2,}"
                value={data.email}
                onChange={handleChange}
            />

            <label htmlFor="password" className="offscreen">Password</label>
            <input
                className="basic-input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                pattern="[\w\d\s.#]{2,}"
                value={data.password}
                onChange={handleChange}
            />
            <label htmlFor="confirmpassword" className="offscreen">Confirm Password</label>
            <input
                className="basic-input"
                type="password"
                id="confirmpassword"
                name="password"
                placeholder="Confirm Password"
                pattern="[\w\d\s.#]{2,}"
            />
            <input
                className="basic-input"
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Postal Code"
                pattern="([A-Z])[\w\s.]{1,}"
                value={data.postalCode}
                onChange={handleChange}
            />
        </div>
    )

    return content
}
export default Basics