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

async function CheckUser(id,history){

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
		if(json.isHelper == undefined){
			history("/forma")

			return false;
		}
        else{
            history("/home")

            return true
        }
	})
	.catch((error) => console.error("Error:",error));

	return true;
}


export default function HomePage(){
    const history = useNavigate();
	const id = getUserId();
    let cookie = undefined;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${"session_id"}=`);
	if (parts.length === 2) cookie = parts.pop().split(';').shift();
	
	if (cookie === undefined) {
		history('/auth',{replace:true});
	}
	else{
		CheckUser(id,history);
	}

    const [posts, setPosts] = useState([])
    const [isFetching, setFetching] = useState(false)

    useEffect(()=>{
        async function fetchPosts(){
            setFetching(true)
            // const response = await  fetch('/api/getLastPosts');
            const response = await  fetch('/api/getLastPosts')
            .then((res) => {
                if(!res.ok){
                    throw new Error(`HTTP error ${res.status}`);
                }
                return res.json()
            })
            .then(json =>{
        
                setPosts(json.postArray);
            })
            .catch((error) => console.error("Error:",error));
            
            setFetching(false)
        }
        fetchPosts();

    },[])
    let a =0;
    let n = 10;
    function setPages(){
        console.log(posts);
        if(posts != undefined && posts.length > 0){
        return posts.map(ab =>{
            
            if (a <= n){
                a +=1;
                return <Article about={ab} key={ab.postId}/>
            }
        })
        }
        else{
            return <p>Немає постів</p>
        }
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