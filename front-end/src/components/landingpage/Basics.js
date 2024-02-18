import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage.css'


const Basics = () => {

    const { data, handleChange } = useSignUpContext()

    const content = (
        <div className="flex-col">
            <div className="split-container">
                <div className="flex-col">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        type="text"
                        id="birthday"
                        name="birthday"
                        placeholder="MM/DD/YYYY"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.birthday}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="username">Display Name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder=""
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.username}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                placeholder=""
                pattern="[\w\d\s.#]{2,}"
                value={data.email}
                onChange={handleChange}
            />

            <label htmlFor="password" className="offscreen">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Apt. 2"
                pattern="[\w\d\s.#]{2,}"
                value={data.password}
                onChange={handleChange}
            />

            <label htmlFor="postalCode">Postal Code</label>
            <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder=""
                pattern="([A-Z])[\w\s.]{1,}"
                value={data.postalCode}
                onChange={handleChange}
            />

            <label htmlFor="genderIdentity">What gender do you identify as?</label>
            <select
                id="genderIdentity"
                name="genderIdentity"
                value={data.genderIdentity}
                onChange={handleChange}
            >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
    )

    return content
}
export default Basics