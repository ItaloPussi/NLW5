import { Header } from '../components/Header'
import { Player } from '../components/Player'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContext } from '../context/PlayerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  function togglePlay(){
    setIsPlaying(prev => !prev)
  }

  function play(episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying, play, togglePlay, setPlayingState}}>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
          
        </div>
    </PlayerContext.Provider>
    
  )
}

export default MyApp
