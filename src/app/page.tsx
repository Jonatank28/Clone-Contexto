'use client'
import InputResponse from '@/components/InputResponse'
import { useState } from 'react'
import { arrWords } from '../data/arrWords'
import { Word } from '@/types/Word'
import { Error } from '@/types/Error'

type Props = {}

export default function Home({}: Props) {
    const [tentativas, setTentativas] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | undefined>()
    const [currentWord, setCurrentWord] = useState<string>('')
    const [currentWordAux, setCurrentWordAux] = useState<Word | undefined>()
    const [selectedWords, setSelectedWords] = useState<Word[]>([])

    //! Executa ao clicar em enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            checksWordExist()
        }
    }

    //! Verifica se a palavra digitada existe no array
    const checksWordExist = async () => {
        const currentWordFormat = currentWord.toLowerCase()
        let wordCurrent = await arrWords.find(
            (word) => word.nome.toLowerCase() === currentWordFormat
        )
        if (wordCurrent) {
            setError(undefined)
            let existSelectedWords = selectedWords.find((word) => {
                return word.nome.toLowerCase() === currentWordFormat
            })
            if (!existSelectedWords) {
                setSelectedWords((prevSelectedWords: Word[]) =>
                    wordCurrent
                        ? [...prevSelectedWords, wordCurrent]
                        : prevSelectedWords
                )
                setTentativas(tentativas + 1)
            } else {
                setError({
                    status: true,
                    type: 'WordNoExist',
                    message: `A palavra ${currentWord} já foi.`,
                })
            }
            setCurrentWordAux(wordCurrent)
            setCurrentWord('')
        } else {
            setError({
                status: true,
                type: 'WordNoExist',
                message: 'Perdão, não conheço essa palavra',
            })
        }
    }

    return (
        <main className="bg-bg-primary h-screen w-screen overflow-x-hidden">
            <div className="w-[480px] mx-auto h-full">
                <h1 className="text-2xl text-white font-extrabold text-center pt-5 uppercase">
                    John Context
                </h1>
                <div className="flex items-center gap-2 pl-2 pt-2">
                    <div>
                        <span className="text-base">JOGO: </span>
                        <span className="text-base font-extrabold">#496</span>
                    </div>
                    <div>
                        <span className="text-base">TENTATIVAS: </span>
                        <span className="text-base font-extrabold">
                            {tentativas}
                        </span>
                    </div>
                </div>
                <div className="pt-3">
                    <input
                        type="text"
                        placeholder="digite uma palavra"
                        className="bg-[#273340] px-[15px] py-[10px] border border-white rounded-md w-full"
                        value={currentWord}
                        onChange={(e) => setCurrentWord(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    {error?.status && error?.type === 'WordNoExist' && (
                        <div className="pt-2">
                            <span>{error.message}</span>
                        </div>
                    )}
                </div>
                {selectedWords.length > 0 && (
                    <div className="pt-5 flex flex-col gap-2">
                        {currentWordAux && (
                            <div className="pb-4">
                                <InputResponse
                                    word={currentWordAux}
                                    key={currentWordAux.id}
                                    currentWordAux={currentWordAux}
                                />
                            </div>
                        )}
                        {selectedWords
                            .sort((a, b) => a.id - b.id) // Ordena o array com base no id
                            .map((word, index) => (
                                <InputResponse
                                    word={word}
                                    key={word.id}
                                    currentWordAux={currentWordAux}
                                />
                            ))}
                    </div>
                )}
            </div>
        </main>
    )
}
