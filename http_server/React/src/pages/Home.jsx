import Header from "../components/react/Header";
import Article from "../components/react/Article";
import '../components/styles/pages/Home/home.css';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";


export default function HomePage(){
   
    return(
       <div className="conteiner">
        <Header></Header>
        <main className="homePage">

        </main>
       </div>
    )
}