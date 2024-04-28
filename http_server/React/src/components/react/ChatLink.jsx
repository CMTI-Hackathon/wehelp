import imgOfProfile from '/imgOfProfile/imgOfProfile.png';
export default function ChatLink(){
    return(
        <div className="chatLink">
            <div className="userImg">
                <img src={imgOfProfile} alt="img of user"/>
            </div>
            <div className="userName">
                <p>Misha</p>
            </div>
            <div className="userLastMessage">
                <p>hello i wants to help you sdfs dfsdfsfsfds</p>
            </div>
        </div>
    )
}