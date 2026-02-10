import { useState } from 'react';

const hashtagDB: Record<string,string[]> = {
  food:['foodie','foodporn','yummy','delicious','homemade','cooking','recipe','foodphotography','instafood','foodstagram','eatclean','healthyfood','dinner','lunch','breakfast'],
  travel:['travel','wanderlust','travelphotography','travelgram','explore','adventure','vacation','tourism','roadtrip','backpacking','travelblogger','instatravel','trip','holiday','nature'],
  fitness:['fitness','gym','workout','fitnessmotivation','fit','bodybuilding','training','health','motivation','exercise','fitfam','muscle','strength','cardio','crossfit'],
  fashion:['fashion','style','ootd','fashionblogger','streetstyle','outfit','fashionista','instafashion','trendy','lookbook','stylish','womensfashion','mensfashion','luxury','beauty'],
  tech:['technology','tech','programming','coding','developer','software','ai','startup','innovation','digital','machinelearning','webdev','javascript','python','data'],
  business:['business','entrepreneur','marketing','success','startup','motivation','money','smallbusiness','branding','digitalmarketing','socialmedia','growth','leadership','hustle','goals'],
  photography:['photography','photooftheday','photo','photographer','instagood','picoftheday','nature','portrait','landscape','streetphotography','canon','nikon','sunset','architecture','art'],
  beauty:['beauty','makeup','skincare','cosmetics','beautyblogger','mua','lipstick','glam','selfcare','beautytips','haircare','nails','lashes','glow','naturalskincare'],
};

export default function HashtagGen() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(15);
  const [tags, setTags] = useState<string[]>([]);

  const generate = () => {
    const key = Object.keys(hashtagDB).find(k => topic.toLowerCase().includes(k));
    const pool = key ? hashtagDB[key] : Object.values(hashtagDB).flat();
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
    const topicTag = topic.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (topicTag && !shuffled.includes(topicTag)) shuffled.unshift(topicTag);
    setTags(shuffled.slice(0, count));
  };

  const output = tags.map(t => '#' + t).join(' ');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter topic (e.g., food, travel, fitness)" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />
        <button onClick={generate} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">#️⃣ Generate</button>
      </div>
      <div className="flex gap-2 items-center"><label className="text-sm text-gray-500">Count:</label>
        {[10,15,20,30].map(n => (<button key={n} onClick={() => setCount(n)} className={`px-3 py-1 rounded-lg text-sm ${count===n?'bg-pink-500 text-white':'bg-gray-100 text-gray-600'}`}>{n}</button>))}
      </div>
      {tags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">{tags.map((t,i) => (
            <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">#{t}</span>
          ))}</div>
          <div className="flex gap-2">
            <input readOnly value={output} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono" />
            <button onClick={() => navigator.clipboard.writeText(output)} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Copy</button>
          </div>
        </>
      )}
    </div>
  );
}
