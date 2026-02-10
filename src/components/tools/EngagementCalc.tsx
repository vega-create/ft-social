import { useState } from 'react';

export default function EngagementCalc() {
  const [followers, setFollowers] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [saves, setSaves] = useState(0);

  const total = likes + comments + shares + saves;
  const rate = followers > 0 ? (total / followers * 100) : 0;
  const rating = rate >= 6 ? 'Excellent 🌟' : rate >= 3 ? 'Good 👍' : rate >= 1 ? 'Average 📊' : rate > 0 ? 'Low ⚠️' : '';

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {[['Followers',followers,setFollowers],['Likes',likes,setLikes],['Comments',comments,setComments],['Shares',shares,setShares],['Saves',saves,setSaves]].map(([l,v,s]) => (
          <div key={l as string}><label className="block text-sm font-medium text-gray-700 mb-1">{l as string}</label>
            <input type="number" value={v as number} onChange={e => (s as Function)(Math.max(0,+e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white text-center">
        <div className="text-5xl font-bold">{rate.toFixed(2)}%</div>
        <div className="text-purple-100 mt-1">Engagement Rate</div>
        {rating && <div className="mt-2 text-lg">{rating}</div>}
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-sm">
        <div className="bg-white border border-gray-100 rounded-xl p-3"><div className="text-xl font-bold text-gray-900">{total.toLocaleString()}</div><div className="text-gray-500">Total Engagements</div></div>
        <div className="bg-white border border-gray-100 rounded-xl p-3"><div className="text-xl font-bold text-gray-900">{followers > 0 ? (total/followers).toFixed(3) : '0'}</div><div className="text-gray-500">Engagement per Follower</div></div>
      </div>
    </div>
  );
}
