import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage.css'
import { useEffect, useState } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-Za-z0-9]{4,20}$/;;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Basics = () => {

    const { data, handleChange } = useSignUpContext()

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(true); 

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    //Modify this to eventually deliver more valid error messages 
    useEffect( () => {
        let validUser = USER_REGEX.test(user);
        //validUser = checkDuplicate(user); 
        // setValidName(USER_REGEX.test(user));

        console.log(`try this password:" ${user}`) 
    }, [user])

    useEffect( () => {
        setValidUser(PWD_REGEX.test(pwd)); 
        setValidMatch(pwd === matchPwd);
        function testInput(input) {
            // Regular expression pattern
            var pattern = /^[A-Za-z0-9]{4,20}$/;
            
            // Test the input against the pattern
            return pattern.test(input);
          } 
    }, [pwd, matchPwd])

    // checkDuplicate(usr) {

    // }

    const content = (
        <div className="basics-div">
            <input
                className="basic-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                pattern="^[A-Za-z0-9]{4,15}$" //numbers or letters, min 4 characters, max of 15 
                value={data.username}
                onChange={e => {handleChange(e)}}
                onBlur={e => {setUser(e.target.value)}}
                //onBlur={checkUsername}
            />
            {/* <p id="uidnote" className={!validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p> */}

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
        </div>
    )

    return content
}
export default Basics