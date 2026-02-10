import { useState } from 'react';

const templates = [
  '{role} | {interest1} & {interest2} | {cta}',
  '🎯 {role} helping people {goal}\n💡 {interest1} • {interest2}\n📍 {location}\n👇 {cta}',
  '{emoji} {role}\n✨ Passionate about {interest1}\n🌍 Based in {location}\n🔗 {cta}',
  '{role} by day, {interest1} enthusiast by night 🌙\n📍 {location} | {cta}',
  '👋 {role} | {interest1} lover\n📈 On a mission to {goal}\n⬇️ {cta}',
];

export default function BioGen() {
  const [role, setRole] = useState('');
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [location, setLocation] = useState('');
  const [goal, setGoal] = useState('');
  const [cta, setCta] = useState('');
  const [emoji, setEmoji] = useState('💼');
  const [bios, setBios] = useState<string[]>([]);

  const generate = () => {
    setBios(templates.map(t => t
      .replace(/{role}/g, role || 'Creative')
      .replace(/{interest1}/g, interest1 || 'Design')
      .replace(/{interest2}/g, interest2 || 'Coffee')
      .replace(/{location}/g, location || 'Earth')
      .replace(/{goal}/g, goal || 'make the world better')
      .replace(/{cta}/g, cta || 'Link below ⬇️')
      .replace(/{emoji}/g, emoji)
    ));
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Role / Title</label><input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Designer" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Interest 1</label><input type="text" value={interest1} onChange={e => setInterest1(e.target.value)} placeholder="Photography" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Interest 2</label><input type="text" value={interest2} onChange={e => setInterest2(e.target.value)} placeholder="Travel" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Location</label><input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="New York" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Goal / Mission</label><input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="inspire creativity" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">CTA</label><input type="text" value={cta} onChange={e => setCta(e.target.value)} placeholder="Shop now ↓" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <button onClick={generate} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Generate Bios</button>
      {bios.map((b, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-start gap-3">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">{b}</pre>
          <button onClick={() => navigator.clipboard.writeText(b)} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs flex-shrink-0">Copy</button>
        </div>
      ))}
    </div>
  );
}
