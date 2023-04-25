import {useEffect, useState} from 'react'
import Tmdb from "./Tmdb"
import { MovieRow } from './components/MovieRow'
import {FeaturedMovie} from './components/FeaturedMovie'
import { Header } from './components/Header' 
import { HomeList, MovieInfo } from './types/TmdbTypes'
import "./App.css"

const App = ()=>{

  const [featuredData, setFeaturedData] = useState<MovieInfo>()
  const [movieList, setMovieList] = useState<HomeList[]>([])
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{

    //catch movielist
    const loadAll = async ()=>{
     let list = await Tmdb.getHomeList();
     setMovieList(list)
     
     //catch featured
     let originals = list.filter(i=>i.slug==='originals')
     let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     console.log(randomChosen)
     let chosen = originals[0].items.results[randomChosen];
     let chosenInfo= await Tmdb.getMovieInfo(chosen.id,'tv')
     console.log(chosenInfo)
     setFeaturedData(chosenInfo)

    }
    loadAll()
  }
  ,[]);
  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true)
        
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return ()=>{
      window.removeEventListener('scroll',scrollListener)
    }
  }
  ,[])
  return(
    <div className='page'>
      <Header black={blackHeader}/>
      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }
        <section className='lists'>
          {movieList.map((item,key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
        </section>
        <footer>
          Feito com <span role='img' aria-label='coração'></span> pela B7Web
          <br />
          Direitos de imagem para Netflix <br />
          Imagens Pegas via Api The MovieDb
        </footer>
        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
          </div>
        
        }
        
    </div>
  )
}


export default App