import { MovieInfo } from "../../types/TmdbTypes"
import "./FeaturedMovie.css"
type Props ={
    item:MovieInfo
}
export const FeaturedMovie = ({item}:Props)=>{
    console.log(item)

    let firstDate = new Date(item.first_air_date);
    let genres:string[] = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name)
    }

    let description = item.overview;
    if(description.length >230){
        description=description.substring(0,230) + "...";
    }
return(
    <div className="featured" style={{
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundImage:`url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
        
        }}>
       <div className="featured--vertical">
        <div className="featured--horizontal">
            <div className="featured--name">{item.original_name}</div>
            <div className="featured--info">
                <div className="featured--points">{item.vote_average.toFixed(1)} Pontos</div>
                <div className="featured--year">{firstDate.getFullYear()}</div>
                <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1? 's':''}</div>
            </div>
            <div className="featured--description">{description}</div>
            <div className="featured--buttons">
                <a className="featured--watchbutton" href={`/watch/${item.id}`}>▶ Assistir</a>
                <a className="featured--mylistbutton" href={`/list/add/${item.id}`}>+ Minha Lista</a>
            </div>
            <div className="featured--genres">
               <strong>Generos:</strong>{genres.join(', ')}</div>
        </div>
       </div>
      
    </div>
)
}