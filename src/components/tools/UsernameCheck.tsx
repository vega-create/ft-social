import { useState } from 'react';

const platforms = [
  {name:'Instagram',url:'https://instagram.com/',icon:'📸'},
  {name:'Twitter/X',url:'https://x.com/',icon:'🐦'},
  {name:'TikTok',url:'https://tiktok.com/@',icon:'🎵'},
  {name:'YouTube',url:'https://youtube.com/@',icon:'▶️'},
  {name:'GitHub',url:'https://github.com/',icon:'💻'},
  {name:'LinkedIn',url:'https://linkedin.com/in/',icon:'💼'},
  {name:'Pinterest',url:'https://pinterest.com/',icon:'📌'},
  {name:'Reddit',url:'https://reddit.com/user/',icon:'🤖'},
];

export default function UsernameCheck() {
  const [username, setUsername] = useState('');
  const valid = /^[a-zA-Z0-9._]{1,30}$/.test(username);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <span className="px-4 py-3 bg-gray-100 rounded-l-xl text-gray-500 font-mono">@</span>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl outline-none focus:ring-2 focus:ring-purple-500 font-mono" />
      </div>
      {username && !valid && <p className="text-sm text-red-500">Username can only contain letters, numbers, dots, and underscores (max 30 chars)</p>}
      {username && valid && (
        <div className="grid sm:grid-cols-2 gap-3">
          {platforms.map(p => (
            <a key={p.name} href={`${p.url}${username}`} target="_blank" rel="noopener" className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-colors">
              <span className="text-2xl">{p.icon}</span>
              <div className="flex-1"><p className="font-medium text-gray-900 text-sm">{p.name}</p><p className="text-xs text-gray-400 font-mono">{p.url}{username}</p></div>
              <span className="text-purple-500 text-sm">Check →</span>
            </a>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-400">Click each platform to check if the username is available. We open the profile page — if it shows "not found", the username is likely available.</p>
    </div>
  );
}
