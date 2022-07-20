/* eslint-disable array-callback-return */
// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h2 className="m-3 d-flex justify-content-center">Search Filter</h2>
      <div class="input-group mb-3">
        <input
          type="text"
          value={input}
          className="border-2 border-primary  form-control"
          placeholder="Search Post"
          onChange={({ target: t }) => setInput(t.value)}
        />
      </div>
      {loading ? (
        <h4 className="p-5  bg-secondary text-white d-flex justify-content-evenly">
          Loading...
        </h4>
      ) : (
        posts
          .filter((value) => {
            const { title: t } = value;
            if (t.includes(input)) return value;
            if (input === "") return value;
          })
          .map(({ title: t }) => (
            <h5 className="p-4  bg-secondary text-white d-flex justify-content-center">
              {t}
            </h5>
          ))
      )}
    </>
  );
}

export default App;
