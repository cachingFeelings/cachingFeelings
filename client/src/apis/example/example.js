import axios from 'axios';

export async function getPost() {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return res;
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