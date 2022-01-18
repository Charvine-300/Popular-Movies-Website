import type { NextPage } from 'next'
import Image from 'next/image'
import Intro from '../public/bg-pattern-intro.svg'
import styles from '../styles/css/Home.module.css'

const First: NextPage = () => {
  return (
    <div className={styles.first}>
      <Image src={Intro} alt='Intro Doodle' className={styles.image} />
    </div>
  )
}
  
export default First

