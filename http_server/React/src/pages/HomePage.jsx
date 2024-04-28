import Header from "../components/react/Header";
import Article from "../components/react/Article";
import '../components/styles/pages/Home/home.css';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function getUserId(){
	let cookie = undefined;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${"user_id"}=`);
	if (parts.length === 2) cookie = parts.pop().split(';').shift();
	return cookie;
}

async function CheckUser(id){
	const response = await fetch(`/api/getUserById?id=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res =>{
		if(!res.ok){
			throw new Error(`HTTP error ${res.status}`);
		}
		return res.json();
	})
	.then(json =>{
        console.log(json);
		if(json.isHelper == true){
			return true;
		}
	})
	.catch((error) => console.error("Error:",error));

	return false;
}


export default function HomePage(){
    const history = useNavigate();
    let id = getUserId();
    const isHelper = CheckUser(id);

    if(!isHelper){
		history('/forma');
	}

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