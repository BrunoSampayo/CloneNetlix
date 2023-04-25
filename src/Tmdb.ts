import { HomeList, MovieInfo } from "./types/TmdbTypes";

const API_KEY ='c47112be1c8c4966709d97411f78927d';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais da netflix
- recomendados (trending)
- ação
- comédia
- terror
- romance
- documentários
*/




const basicFetch = async (endPoint:string) =>{
    const req = await fetch (`${API_BASE}${endPoint}`);
    const json = await req.json()
    return json
}
export default {
    getHomeList:async ():Promise<HomeList[]> => {
        return [
            {
                slug:'originals',
                title:'Originais Netflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'trending',
                title:'Recomendados para você',
                items:await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'toprated',
                title:'Em Alta',
                items:await basicFetch (`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'action',
                title:'Ação',
                items:await basicFetch (`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'comedy',
                title:'Comédia',
                items:await basicFetch (`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'horror',
                title:'Terror',
                items:await basicFetch (`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'romance',
                title:'Romance',
                items:await basicFetch (`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'documentary',
                title:'Documentários',
                items:await basicFetch (`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },
    getMovieInfo: async (movieId:number,type:'movie'|'tv'):Promise<MovieInfo>=>{
        let info:MovieInfo|any = {}

        if(movieId){
            switch(type){
                case "movie":
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case "tv":
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default:
                    info = {}
                break;
            }
        }
        return info

    }
}