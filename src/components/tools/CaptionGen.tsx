import { useState } from 'react';

const templates: Record<string,string[]> = {
  Motivational:['Rise and grind! 💪 Today is YOUR day.','Small steps every day lead to big changes. Keep going! ✨','Your only limit is the one you set for yourself. Break through! 🚀','Dream it. Plan it. Do it. 🎯','The best time to start was yesterday. The next best time is NOW. ⏰'],
  Funny:["My bed is a magical place where I suddenly remember everything I forgot to do. 😴","I need a six-month vacation, twice a year. Who's with me? ✈️","Running late is my cardio. 🏃‍♂️","I'm not lazy, I'm on energy saving mode. 🔋","Diet day 1: I've removed all the junk food from my house. It was delicious. 🍕"],
  'Food & Drink':['Life is too short for bad coffee ☕','Eating my feelings and they taste delicious 🍔','Food is my love language 💕','Brunch without champagne is just a sad late breakfast 🥂','Home-cooked happiness 🍳'],
  Travel:['Collect moments, not things 🌍','Adventure awaits around every corner ✈️','Not all who wander are lost... but I definitely need Google Maps 📍','Catching flights, not feelings ✈️','The world is a book, and I plan to read every page 📖'],
  Business:['Building something amazing, one day at a time 🏗️','Your network is your net worth. Connect, grow, succeed 🤝','Success leaves clues. Pay attention 🔍','Turning ideas into reality 💡','Work hard in silence, let success make the noise 🔇'],
};

export default function CaptionGen() {
  const [vibe, setVibe] = useState('Motivational');
  const [captions, setCaptions] = useState<string[]>([]);

  const generate = () => {
    const pool = templates[vibe] || [];
    setCaptions([...pool].sort(() => Math.random() - 0.5).slice(0, 3));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(templates).map(v => (
          <button key={v} onClick={() => setVibe(v)} className={`px-4 py-2 rounded-xl text-sm font-medium ${vibe===v?'bg-purple-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{v}</button>
        ))}
      </div>
      <button onClick={generate} className="px-6 py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 w-full">✨ Generate Captions</button>
      {captions.map((c, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-start gap-3">
          <p className="text-gray-800">{c}</p>
          <button onClick={() => navigator.clipboard.writeText(c)} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs flex-shrink-0">Copy</button>
        </div>
      ))}
    </div>
  );
}
