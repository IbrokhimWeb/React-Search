import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");

    useEffect(()=>{
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPosts(response.data);
            setLoading(false);

        } 
        loadPosts();
    },[]);

  
    return (
        <>
            <h2 className="m-3 d-flex justify-content-center" >Search Filter</h2>
            <div class="input-group mb-3">
                <input  
                        type="text" 
                        className="border-2 border-primary  form-control" 
                        placeholder="Search Post"
                        onChange={e => setInput(e.target.value)} 
                />
            </div>
            {
                loading ? <h4 className="p-5  bg-secondary text-white d-flex justify-content-evenly" >Loading...</h4>
                        : posts.filter(value => {
                            if(setInput === ""){
                                return value;
                            }else if(value.title.includes(input)){
                                return value;
                                // console.log(value);
                            }
                        }).map(item => <h5 className="p-4  bg-secondary text-white d-flex justify-content-center">{item.title}</h5>)
            } 
        </>
    );
}

export default App;

