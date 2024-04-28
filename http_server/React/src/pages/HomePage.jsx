import Header from "../components/react/Header";
import Article from "../components/react/Article";
import '../components/styles/pages/Home/home.css';
import {useState, useEffect} from 'react';
export default function HomePage(){
    const [posts, setPosts] = useState([])
    const [isFetching, setFetching] = useState(false)
    
    useEffect(()=>{
        async function fetchPosts(){
            setFetching(true)
            const response = await  fetch('https://jsonplaceholder.typicode.com/posts');
            const resData = await response.json();
            setPosts(resData)
            setFetching(false)
        }
        fetchPosts();
 
    },[])
    let a =0;
    let n = 10;
    function setPages(){
        return posts.map(ab=>{
            if (a <= n){
                a +=1;
                return <Article about={ab} key={ab.id}/>
            }
        })
    }
    return(
       <div className="conteiner">
        <Header></Header>
        <main className="homePage">
            <article>
                {isFetching?<p>Зачекайте хвилинку...</p>:setPages()}
            </article>
        </main>
       </div>
    )
}