import imgOfTheProfile from '/imgOfProfile/imgOfProfile.png';
export default function Article(){
    return(
        <>
      
        <div className="article">
            <div className="aboutProfile">
                <ul>
                    <li><img alt="imgOfProfile" src={imgOfTheProfile} className="imgOfProfile"/></li>
                    <li><a href="#" className="nameOfProfile">Michael</a></li>
                    <li><span className='separator'>•</span></li>
                    <li><a href="#" className='dateOfPublication'>10.07.2023</a></li>
                </ul>
                <a href="" className='writeTo'>Написати</a>
            </div>
            <div className="titleOfArticle">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit tempore quibusdam necessitatibus, rem dolorem id consequatur numquam voluptate eveniet optio modi praesentium aut sapiente assumenda molestias, ex iusto adipisci! Deleniti!</p>
            </div>
    
            <div className="textOfArticle">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A nulla natus eos alias praesentium sunt quisquam similique odit eveniet obcaecati animi, doloribus officia voluptatem, quaerat nihil unde tempore numquam delectus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit magni consectetur, tempora qui excepturi repudiandae, a corrupti aspernatur ratione nobis maxime quod quae quam amet est sunt magnam animi!</p>
            </div>          
        </div>
        <hr/>
        </>
    )
}