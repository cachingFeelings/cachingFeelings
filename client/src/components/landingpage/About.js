import React from 'react';
import useSignUpContext from "../../hooks/useSignUpContext"
import './LandingPage'

const About = () => {

    const { data, handleChange } = useSignUpContext();

    let osOptions = ["Windows", "MacOS", "Linux", "Other"];
    let langOptions = ["Python", "Javascript", "Java", "C++", "C#", "Go", "PHP", "Other"]; 
    let CSOptions = ["Data Science", "AI", "ML", "SWE", "Graphics", "Networks", "Game Dev", "Web dev", "Other"];
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
                                name: 'OS',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.OS?.includes(category) ? "active" : ""
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
                                name: 'progLang',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.progLang?.includes(category) ? "active" : ""
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
                                name: 'csInterests',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.csInterests?.includes(category) ? "active" : ""
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
                                name: 'noncsInterests',
                                value: category
                            }
                        })}
                        className={`span ${
                            data?.noncsInterests?.includes(category) ? "active" : ""
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