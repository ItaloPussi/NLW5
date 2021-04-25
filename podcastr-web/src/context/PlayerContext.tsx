import { createContext, ReactNode, useState } from 'react'

interface Episode {
    id: string,
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    durationAsString: string,
    url: string
}

interface PlayerContextData{
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    isLooping: boolean,
    hasNext: boolean,
    hasPrev: boolean,
    canShuffle: boolean,
    play: (episode: Episode) => void,
    togglePlay: () => void,
    setPlayingState: (state: boolean) => void,
    playlist: (list: Episode[], index: number) => void
    playNext: () => void,
    playPrev: () => void,
    shuffle: () => void,
    toggleLoop: () => void,
}

interface PlayerContextProviderProps {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerContextProvider = ({children}: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  function togglePlay(){
    setIsPlaying(prev => !prev)
  }

  function toggleLoop(){
      setIsLooping(prev => !prev)
  }

  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playlist(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const nextEpisodeIndex = currentEpisodeIndex + 1
  const hasNext = nextEpisodeIndex < episodeList.length
  const prevEpisodeIndex = currentEpisodeIndex - 1
  const hasPrev = prevEpisodeIndex >= 0
  const canShuffle = episodeList.length > 1

  function playNext(){
      if(hasNext){
          setCurrentEpisodeIndex(nextEpisodeIndex)
      } 
  }

  function playPrev(){
    if(hasPrev){
        setCurrentEpisodeIndex(prevEpisodeIndex)
    } 
  }

  function shuffle(){
      if(canShuffle){
          const randomIndex = Math.floor(Math.random() * episodeList.length)
          setCurrentEpisodeIndex(randomIndex)
      }
  }

  return (
    <PlayerContext.Provider 
        value={{ 
            episodeList, 
            currentEpisodeIndex, 
            isPlaying, 
            isLooping,
            hasNext,
            hasPrev,
            canShuffle,
            play, 
            togglePlay, 
            setPlayingState,
            playlist,
            playNext,
            playPrev,
            shuffle,
            toggleLoop
    }}>
        {children}
    </PlayerContext.Provider>
  )
}