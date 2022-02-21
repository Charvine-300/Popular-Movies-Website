import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Left from '../public/leftarrow.png'
import Right from '../public/rightarrow.png'
import Link from 'next/link'

interface MoviesProps {
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

const Movies = ({ results }: MoviesProps) => {
  var ImagePadding: number = 20;
  var ScrollPerClick: number;
  var ScrollAmount: number = 0;
  const [contentViv, setContentViv] = useState(0);
  const [sliderViv, setSliderViv] = useState(0);
  const [sliderDiv, setSliderDiv] = useState(0);


  const sliders: any = useRef();
  const content: any = useRef();

  useEffect(() => {
    setContentViv(content?.current?.clientWidth);
    setSliderViv(sliders?.current?.clientWidth);
    setSliderDiv(sliders?.current?.scrollWidth);
  }, []);


  ScrollPerClick = contentViv  + ImagePadding;
  
  function sliderScrollLeft() {
    sliders.current.scrollTop =  0
    sliders.current.scrollLeft = (ScrollAmount -= ScrollPerClick)

    if(ScrollAmount < 0) {
      ScrollAmount = 0;
    }
  }

  function sliderScrollRight() {
    if(ScrollAmount <= ( sliderDiv - sliderViv)) {
      sliders.current.scrollTop =  0
      sliders.current.scrollLeft = (ScrollAmount += ScrollPerClick)
    }
  }

  return (
    <div className={styles.list}>
      <div className={styles.leftarrow} onClick={sliderScrollLeft}> 
        <Image src={Left} width={25} height={25} />
      </div>
      <div className={styles.rightarrow} onClick={sliderScrollRight}>
        <Image src={Right} width={25} height={25} />
      </div>
      <div className={styles.center} ref={sliders}>
        {results.map((mauve) => ( 
          <Link href={`/${mauve.id}`} key={mauve.id}>
            <a>
              <div className={styles.movie} ref={content}>
                <Image layout='fill' alt={mauve.title} src={`http://image.tmdb.org/t/p/w185${mauve.poster_path}`} />
                <div className={styles.cover} title={mauve.title}></div>
              </div>
            </a>           
          </Link>
          
        ))}
      </div>
    </div> 
  )
}

export default Movies
