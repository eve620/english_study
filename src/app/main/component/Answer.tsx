import React from "react";

export default function Answer({word, soundMark}: { word: string, soundMark: string }) {
    return (
        <div>
            <div>{word}</div>
            <div>{soundMark}</div>
            <audio controls autoPlay>
                <source src={`https://dict.youdao.com/dictvoice?audio=${word}&type=1`}/>
            </audio>
        </div>
    )
}