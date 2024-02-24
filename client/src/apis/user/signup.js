import axios from 'axios';

async function createUser({ username, password }) {
    try {
        const SEVRVER_URL = process.env.REACT_APP_SERVER_URL;

        await axios.post(`${SEVRVER_URL}/api/user/create_user`, {
            "username": username,
            "password": password,
        });
    }catch(err) {
        if(err.response) {
            const { data, status } = err.response;
            return {
                error: data.error,
                status,
            }
        }

        return {
            error: "something goes wrong",
            status: 500,
        }
    }
}