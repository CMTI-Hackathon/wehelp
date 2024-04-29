import Header from "../components/react/Header"
import '../components/styles/pages/Post/post.css'
import goBackImg from '/imgOfSite/goBack.png'
import imgOfProfile from '/imgOfProfile/imgOfProfile.png'
import imgOfTheProfile from '/imgOfProfile/imgOfProfile.png'
import { useNavigate, useLocation } from 'react-router-dom';
export default function PostPage(){
    let location = useLocation();
    let history = useNavigate();
    console.log(location)
    const postInf = {
        titleOfArticle: location.state.titleText,
        textOfArticle:location.state.text
    }
    return(
        <div className="conteiner">
            <Header></Header>
            <main className='postPage'>
                <div className="post">
                    <div className="aboutProfile">
                        <div className="goBack" onClick={() => history(-1)}>
                            <img src={goBackImg} alt="go back btn"/>
                        </div>
                        <div className="imgOfProfile">
                            <img src={imgOfProfile} alt="" />
                        </div>
                        <div className="userName">
                            <p>Misha</p>
                        </div>
                        <div className="timeOfPosting">
                            <p>10.11.2032</p>
                        </div>
                        <div className="sendMsg">
                            <a href="" className='writeTo'>Написати</a>
                        </div>
                    </div>
                    <article>
                        <div className="titleOfArticle"><p>{postInf.titleOfArticle}</p></div>
                        <div className="textOfArticle"><p>{postInf.textOfArticle}</p></div>
                    </article>
                </div>
            </main>
        </div>
    )
}