import React from 'react';
import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage'

const About = () => {

    const { data, handleChange } = useSignUpContext();

    let osOptions = ["Windows", "MacOS", "Linux"];
    let langOptions = ["Python", "Javascript", "Java", "C++", "C#", "Go", "PHP"]; 
    let CSOptions = ["Data Science", "AI", "ML", "SWE", "Graphics", "Networks", "Game Dev", "Web dev"];
    let nonCSOptions = ["travel", "music", "movies", "books", "sports", "fitness", "art", "gaming", "fashion"];

    const content = (
        <div>
            <div>
            <label style={{ display: "block" }}>Bio:</label>
            <textarea placeholder="Use this space to showcase your personality, interests, and what you're looking for in a partner..." value={data.bio} id="bio" name="bio" rows="4" cols="50" onChange={handleChange}></textarea>
            </div>
            <div style={{width: "200%"}}>
                <label style={{ display: "block", marginBottom: "10px" }}>Favourite OS</label>
                <div className="span-container">
                    {osOptions.map((category, idx) => (
                    <span
                        onClick={() => handleChange({
                            target: {
                                name: 'interests',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.interests?.includes(category) ? "active" : ""
                        }`}
                        key={`osOption-${idx}`}
                    >
                        {category}
                    </span>
                    ))}
                </div>
            </div>
            
            <div style={{width: "200%"}}>
                <label style={{ display: "block", marginBottom: "10px", marginTop: "10px" }}>Favourite Programming Languages</label>
                <div className="span-container">
                    {langOptions.map((category, idx) => (
                    <span
                        onClick={() => handleChange({
                            target: {
                                name: 'interests',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.interests?.includes(category) ? "active" : ""
                        }`}
                        key={`osOption-${idx}`}
                    >
                        {category}
                    </span>
                    ))}
                </div>
            </div>

            <div style={{width: "200%"}}>
                <label style={{ display: "block", marginBottom: "10px", marginTop: "10px" }}>CS Interests</label>
                <div className="span-container">
                    {CSOptions.map((category, idx) => (
                    <span
                        onClick={() => handleChange({
                            target: {
                                name: 'interests',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.interests?.includes(category) ? "active" : ""
                        }`}
                        key={`osOption-${idx}`}
                    >
                        {category}
                    </span>
                    ))}
                </div>
            </div>

            <div style={{width: "200%"}}>
                <label style={{ display: "block", marginBottom: "10px", marginTop: "10px" }}>Non-CS Interests (if any)</label>
                <div className="span-container">
                    {nonCSOptions.map((category, idx) => (
                    <span
                        onClick={() => handleChange({
                            target: {
                                name: 'interests',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.interests?.includes(category) ? "active" : ""
                        }`}
                        key={`osOption-${idx}`}
                    >
                        {category}
                    </span>
                    ))}
                </div>
            </div>
        </div>

    )

    return content
}
export default About