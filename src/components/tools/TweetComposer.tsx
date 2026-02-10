import { useState } from 'react';

export default function TweetComposer() {
  const [tweets, setTweets] = useState(['']);
  const limit = 280;

  const update = (i: number, val: string) => { const n = [...tweets]; n[i] = val; setTweets(n); };
  const add = () => setTweets([...tweets, '']);
  const remove = (i: number) => { if (tweets.length > 1) setTweets(tweets.filter((_, j) => j !== i)); };
  const copyAll = () => navigator.clipboard.writeText(tweets.filter(t => t.trim()).join('\n\n---\n\n'));

  return (
    <div className="space-y-4">
      {tweets.map((t, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 font-medium">{tweets.length > 1 ? `Tweet ${i+1}/${tweets.length}` : 'Tweet'}</span>
            {tweets.length > 1 && <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>}
          </div>
          <textarea value={t} onChange={e => update(i, e.target.value)} placeholder="What's happening?" className="w-full h-28 p-3 border border-gray-200 rounded-lg outline-none resize-none text-sm" maxLength={limit} />
          <div className="flex justify-between items-center mt-1">
            <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full ${t.length > limit * 0.9 ? 'bg-red-500' : t.length > limit * 0.7 ? 'bg-yellow-500' : 'bg-purple-500'}`} style={{width:`${Math.min(100,t.length/limit*100)}%`}} /></div>
            <span className={`text-xs font-mono ${t.length > limit ? 'text-red-500' : 'text-gray-400'}`}>{t.length}/{limit}</span>
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">+ Add tweet (thread)</button>
        <button onClick={copyAll} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Copy all</button>
      </div>
    </div>
  );
}
