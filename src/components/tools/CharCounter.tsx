import { useState } from 'react';

const limits: [string,number,string][] = [['Twitter',280,'🐦'],['Instagram Caption',2200,'📸'],['Instagram Bio',150,'📝'],['Facebook Post',63206,'📘'],['LinkedIn Post',3000,'💼'],['TikTok Caption',2200,'🎵'],['YouTube Title',100,'▶️'],['YouTube Description',5000,'📺'],['Pinterest Description',500,'📌']];

export default function CharCounter() {
  const [text, setText] = useState('');
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste your text..." className="w-full h-40 p-4 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {limits.map(([name,limit,icon]) => {
          const pct = Math.min(100, text.length/limit*100);
          const over = text.length > limit;
          return (
            <div key={name} className="bg-white border border-gray-100 rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{icon} {name}</span>
                <span className={`text-xs font-mono ${over?'text-red-500':'text-gray-400'}`}>{text.length}/{limit}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${over?'bg-red-500':pct>80?'bg-yellow-500':'bg-purple-500'}`} style={{width:`${Math.min(100,pct)}%`}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
