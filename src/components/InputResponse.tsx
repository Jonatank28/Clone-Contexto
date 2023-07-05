import { Word } from '@/types/Word'
import React from 'react'
import { arrWords } from '../data/arrWords'

interface Props {
    word: Word
    currentWordAux: Word
}

const InputResponse = ({ word, currentWordAux }: Props) => {
    const mapIdToWidth = (id: number) => {
        const maxId = arrWords.length
        return ((maxId - id) / (maxId - 1)) * 100
    }

    const wordId = word.id
    const progressWidth = mapIdToWidth(wordId)
    console.log('🚀 ~ progressWidth:', progressWidth)

    const progressColor =
        progressWidth < 20
            ? 'red'
            : progressWidth >= 20 && progressWidth < 70
            ? 'orange'
            : progressWidth >= 70 && progressWidth <= 100
            ? 'green'
            : 'null'

    return (
        <div
            className={`w-full flex justify-between bg-[#1E2732] rounded-md text-white outline-none h-[40px] relative ${
                currentWordAux?.nome?.toLowerCase() ===
                word?.nome?.toLowerCase()
                    ? 'border-2 border-white'
                    : ''
            }`}
        >
            <div className="w-full text-white">
                <div
                    className="h-full relative px-2 py-4"
                    style={{
                        width: `${progressWidth < 0 ? 0 : progressWidth}%`,
                        background: `${progressColor}`,
                    }}
                ></div>
            </div>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-extrabold">
                {word.nome}
            </span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-extrabold">
                {word.id}
            </span>
        </div>
    )
}

export default InputResponse
