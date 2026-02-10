import { useState } from 'react';

const data: Record<string,{days:string[];times:string[];notes:string}> = {
  Instagram:{days:['Tuesday','Wednesday','Thursday'],times:['10:00 AM','1:00 PM','7:00 PM'],notes:'Reels perform best Tuesday-Thursday. Avoid posting before 6 AM.'},
  Twitter:{days:['Monday','Tuesday','Wednesday'],times:['8:00 AM','12:00 PM','5:00 PM'],notes:'B2B content performs best on weekday mornings. Threads get more engagement midweek.'},
  Facebook:{days:['Wednesday','Thursday','Friday'],times:['9:00 AM','1:00 PM','3:00 PM'],notes:'Video content gets 6x more engagement. Post during lunch breaks and early afternoon.'},
  LinkedIn:{days:['Tuesday','Wednesday','Thursday'],times:['7:00 AM','10:00 AM','12:00 PM'],notes:'Professional content performs best mid-morning. Avoid weekends.'},
  TikTok:{days:['Tuesday','Thursday','Friday'],times:['7:00 AM','12:00 PM','7:00 PM'],notes:'Consistency matters more than timing. Post 1-3 times daily for growth.'},
  Pinterest:{days:['Saturday','Sunday','Friday'],times:['8:00 PM','9:00 PM','11:00 PM'],notes:'Evening and weekend pins perform best. Seasonal content should be pinned 45 days early.'},
  YouTube:{days:['Thursday','Friday','Saturday'],times:['12:00 PM','3:00 PM','5:00 PM'],notes:'Publish 2+ hours before peak viewing time to allow indexing.'},
};

export default function BestTimePost() {
  const [platform, setPlatform] = useState('Instagram');
  const d = data[platform];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(data).map(p => (
          <button key={p} onClick={() => setPlatform(p)} className={`px-4 py-2 rounded-xl text-sm font-medium ${platform===p?'bg-purple-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
        ))}
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{platform}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><p className="text-sm font-medium text-gray-600 mb-2">📅 Best Days</p>
            <div className="flex flex-wrap gap-2">{d.days.map(day => (<span key={day} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">{day}</span>))}</div></div>
          <div><p className="text-sm font-medium text-gray-600 mb-2">⏰ Best Times</p>
            <div className="flex flex-wrap gap-2">{d.times.map(time => (<span key={time} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">{time}</span>))}</div></div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-600">💡 {d.notes}</p></div>
      </div>
    </div>
  );
}
