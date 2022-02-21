import Head from 'next/head'
import Image from 'next/image'
import Movies from '../components/Movies'
import Banner from '../public/banner.svg'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'

interface HomeProps {
  results: {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [number, number, number, number],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  }[];
}

const Home = ({ results }: HomeProps) => {
  console.log(results);

  return (
    <div className={styles.container}>
      <Head>
        <title> Netflix | Popular Movies </title>
        <meta name="description" content="A coallated list of the most popular movies on Netflix" />
        <link rel="icon" href="/netflixlogo.svg" />
        <meta property="og:image" content="logo.svg" />
        <meta property="og:type" content="website" />
		    <meta property="og:title" content="List of Popular Movies" />
        <meta property="og:url" content="https://popular-movies-blush.vercel.app/" />
        <meta property="og:description" content="Listing of popular movies worldwide" />
      </Head>

      <main className={styles.main}>
        <div className={styles.banner}> 
          <Image alt="Banner" src={Banner} /> 
        </div>
        <Movies results={results} />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e9c7db71942caaa2de1b8d125418d3c');
  const data = await res.json();
  const results = data.results;

  return {
    props: {
      results
    }
  }
}
