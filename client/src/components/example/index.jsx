import { useEffect, useState } from "react"
import { getPost } from "../../apis/example/example"

const Example = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getPost();
            setPosts(result.data)
        })();
      }, []);
      
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "aqua"
            }}
        >
            <div>
                {posts.map((post, index) => (
                <div key={index}>
                <p>{post.userId}</p>
                <p>{post.title}</p>
            </div>
      ))}
            </div>
        </div>
    )
}

export default Example;