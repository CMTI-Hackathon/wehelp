import Header from "../components/react/Header";
import Article from "../components/react/Article";
import '../components/styles/pages/Home/home.css';
export default function HomePage(){
    return(
       <div className="conteiner">
        <Header></Header>
        <main className="homePage">
            <article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
            </article>
        </main>
       </div>
    )
}