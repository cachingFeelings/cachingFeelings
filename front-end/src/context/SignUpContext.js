import { createContext, useState } from "react"

const SignUpContext = createContext({})

export const SignUpProvider = ({ children }) => {

    const title = {
        0: 'The Basics',
        1: 'For the Algorithm',
        2: 'Configuration File',
        3: 'Images'
    }

    const [page, setPage] = useState(0)

    const [data, setData] = useState({
        email: "",
        password: "", 
        username: "",
        birthday: "",
        postalCode: "",
        genderIdentity: {
            selected: "",
            custom: ""
        },
        showUsersLookingFor: "",
        matchWith: "",
        bio: "",
        OS: [],
        csInterests: [],
        noncsInterests: []
    })

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        setData(prevData => ({
            ...prevData, [name]: value
        }))
    }

    const { ...requiredInputs } = data
    //will check to make sure none of the values in data are an empty string
    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('bill') && key !== 'billAddress2')
        .map(key => data[key])
        .every(Boolean)

    const canNextPage2 = Object.keys(data)
        .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
        .map(key => data[key])
        .every(Boolean)

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(title).length - 1 && "remove-button"

    return (
        <SignUpContext.Provider value={{ title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, submitHide }}>
            {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext