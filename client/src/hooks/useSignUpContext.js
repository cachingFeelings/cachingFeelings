import { useContext } from "react"
import SignUpContext from "../context/SignUpContext"

const useSignUpContext = () => {
    return useContext(SignUpContext)
}

export default useSignUpContext