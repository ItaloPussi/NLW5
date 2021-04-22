import { createContext } from 'react'

interface Episode {
    id: string,
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

interface PlayerContextData{
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    play: (episode: Episode) => void,
    togglePlay: () => void,
    setPlayingState: (state: boolean) => void,
}

export const PlayerContext = createContext({} as PlayerContextData)
