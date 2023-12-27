"use client"
import React, {useEffect, useRef, useState} from "react";
import Answer from "@/app/main/_component/Answer";
import Question from "@/app/main/_component/Question";

const courseDate = [
    {
        name: "第一节课",
        statements: [
            {
                "chinese": "现在",
                "english": "now",
                "soundmark": "/naʊ/"
            },
            {
                "chinese": "未来",
                "english": "future",
                "soundmark": "/ˈfjuːtʃər/"
            },
            {
                "chinese": "喜欢",
                "english": "like",
                "soundmark": "/xihuan/"
            },
            {
                "chinese": "我爱你",
                "english": "I love you",
                "soundmark": "/wo ai ni/"
            }
        ]
    }
]

export default () => {
    const [currentCourse, setCurrentCourse] = useState(courseDate[0])
    const statementIndex = useRef(0)
    const {chinese, english, soundmark} = currentCourse.statements[statementIndex.current]

    let failedCount = useRef(0)
    const failedCountLimit: number = 3

    const [currentMode, setCurrentMode] =
        useState<"question" | "answer" | "correct">("question")
    const [inputValue, setInputValue] = useState<string>("")

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (inputValue === english) {
                handleAnswer()
            } else {
                setInputValue("")
                failedCount.current++
                if (failedCount.current === failedCountLimit) {
                    handleAnswer()
                }
            }
        }
    }

    function handleAnswer() {
        setInputValue("")
        setCurrentMode("answer")
        if (failedCount.current !== failedCountLimit) {
            setCurrentMode("correct")
        }
        failedCount.current = 0;
    }

    function handleNext() {
        if (statementIndex.current < currentCourse.statements.length - 1) {
            setCurrentMode("question")
            statementIndex.current++
        } else alert("No more words in this course")
    }

    return (
        <div className="content-container">
            <div>
                <p style={{color: "green"}}>{currentCourse.name}</p>
                {currentMode === "question" ?
                    (<Question word={chinese}/>) : (<Answer word={english} soundMark={soundmark}/>)}
                <div>
                    {currentMode === "correct" ?
                        (<button onClick={handleNext}
                                 style={{backgroundColor: "lightblue", padding: "10px", borderRadius: "20px"}}>Next Word</button>)
                        : (<input type="text" value={inputValue}
                                  onChange={handleInputValue}
                                  onKeyDown={handleKeyDown}
                                  style={{border: '1px solid black', borderRadius: '10px', padding: '3px 10px'}}/>)}
                </div>
            </div>
        </div>
    )
}