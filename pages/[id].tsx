import Head from 'next/head'
import Image from 'next/image'
import Star from '../star.svg'
import Banner from '../public/banner.svg'
import Home from '../public/home.svg'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

interface DetailsProps {
  path: {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genres: {
      id: number,
      name: string,
    }[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: string,
    poster_path: string,
    production_companies: {
      id: number,
      logo_path: null
      name: string,
      origin_country: string,
    }[],
    production_countries: {
      iso_3166_1: string, 
      name: string
    }[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: {
      english_name: string,
      iso_639_1: string, 
      name: string
    }[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
  };
}

const imageHolder = {
  width: 'fit-content',
  height: 'fit-content',
  margin: '0px auto',
  /*transform: 'rotate(60deg)',*/
}



const Details = ({ path }: DetailsProps) => {
  console.log(path)

  return (
    <>
      <div className={styles.holder}>
        <Image src={Banner} alt="Banner" height="30px" width="120px" />
        <Link href='/'>
          <a>
            <Image src={Home} alt="Home" height="30px" width="30px" />
          </a>
        </Link>
      </div>

      <div className={styles.container}>
        <Head>
          <title> {path.title} |  Popular Movies </title>
          <meta name="description" content="A coallated list of the most popular movies on Netflix" />
        </Head>
 
        <div className={styles.main} id={styles.height}>
          <div className={styles.info}>
            <div className={styles.box}>
              <div style={imageHolder} id={styles.left}> 
                <Image alt="Movie Poster" src={`http://image.tmdb.org/t/p/w185${path.poster_path}`} width='200px' height='300px' />
              </div>
            </div>
            <div className={styles.box}>
              <h1> {path.title} </h1>
              <blockquote> &quot;{path.tagline}&quot; </blockquote>
              <p> {path.overview } </p>
              <h3> Production Companies: </h3>
              <ul>
                {path.production_companies.map((prod) => (
                  <li key={prod.id}> {prod.name},  </li>
                ))}
              </ul>
              <h3> Genres: </h3>
              <ul>
                {path.genres.map((genre) => (
                  <li key={genre.id}> {genre.name},  </li>
                ))}
              </ul>
              <h3> Release Date: </h3>
              <p> {path.release_date} </p>
              <h3> Runtime: </h3>
              <p> {Math.floor(path.runtime / 60)}hr(s)  {path.runtime % 60}mins </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Details

export const getStaticPaths = async () => {
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e9c7db71942caaa2de1b8d125418d3c');
  const data = await res.json();

  const paths = data.results.map((path: any)=> {
    return {
      params: {
        id: path.id.toString(),
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9e9c7db71942caaa2de1b8d125418d3c`);
  const data = await res.json();

  return {
    props: {
      path: data
    }
  }

}