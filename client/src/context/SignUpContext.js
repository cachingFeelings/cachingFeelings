import React from 'react';
import { createContext, useState } from "react"

const SignUpContext = createContext({})

export const SignUpProvider = ({ children }) => {

    const title = {
        0: 'The Basics',
        1: 'Configuration File',
        2: 'Images'
    }

    const [page, setPage] = useState(0)

    const [data, setData] = useState({
        password: "", 
        username: "",
        DOB: "",
        postalCode: "",
        gender: "",
        showUsersLookingFor: "",
        matchWith: "",
        bio: "",
        interests: [],
        profilePhoto: "",
        pictures: []
    })

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value === 'file'  ? e.target.files[0] : e.target.value;

        setData(prevData => {
            if (name === 'pictures'){
                console.log(`The data being sent to the frontend is: ${value[0]} to key: ${name}`)
                return {...prevData, [name]: value}; 
            }
            else if (Array.isArray(prevData[name])) {
                if (prevData[name].includes(value)) {
                    return { ...prevData, [name]: prevData[name].filter(item => item !== value) };
                } else {
                    return { ...prevData, [name]: [...prevData[name], value] };
                }
            } else { 
                return {...prevData, [name]: value}; 
            }
        }); 
    }; 

    const canSubmit = page === Object.keys(title).length - 1

    const canNextPage1 = true 

    const canNextPage2 = true 

    const disablePrev = page === -1

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)
        || (page === 2)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length - 1 

    const submitHide = page !== Object.keys(title).length - 1 

    return (
        <SignUpContext.Provider value={{ title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, submitHide }}>
            {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext