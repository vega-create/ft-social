import { useState } from 'react';

interface Link { title: string; url: string; }

export default function LinkInBio() {
  const [name, setName] = useState('Your Name');
  const [bio, setBio] = useState('Creator | Designer');
  const [links, setLinks] = useState<Link[]>([{title:'My Website',url:'https://example.com'},{title:'YouTube',url:'https://youtube.com'}]);
  const [bg, setBg] = useState('#7C3AED');

  const add = () => setLinks([...links, {title:'',url:''}]);
  const update = (i:number, field:string, val:string) => { const n=[...links]; (n[i] as any)[field]=val; setLinks(n); };
  const remove = (i:number) => setLinks(links.filter((_,j)=>j!==i));

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui;min-height:100vh;display:flex;align-items:center;justify-content:center;background:${bg};padding:20px}.card{max-width:400px;width:100%;text-align:center}.name{color:#fff;font-size:24px;font-weight:bold;margin-bottom:8px}.bio{color:rgba(255,255,255,0.8);margin-bottom:24px}.link{display:block;padding:16px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);border-radius:12px;color:#fff;text-decoration:none;margin-bottom:12px;font-weight:500;transition:background 0.2s}.link:hover{background:rgba(255,255,255,0.25)}</style></head><body><div class="card"><h1 class="name">${name}</h1><p class="bio">${bio}</p>${links.filter(l=>l.title&&l.url).map(l=>`<a href="${l.url}" class="link" target="_blank">${l.title}</a>`).join('')}</div></body></html>`;

  const download = () => {
    const blob = new Blob([html], {type:'text/html'});
    const a = document.createElement('a'); a.download = 'link-in-bio.html'; a.href = URL.createObjectURL(blob); a.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div><label className="text-xs text-gray-500">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Bio</label><input type="text" value={bio} onChange={e => setBio(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Background</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
        {links.map((l, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={l.title} onChange={e => update(i,'title',e.target.value)} placeholder="Title" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
            <input type="url" value={l.url} onChange={e => update(i,'url',e.target.value)} placeholder="URL" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
            <button onClick={() => remove(i)} className="text-red-400 text-sm px-2">✕</button>
          </div>
        ))}
        <button onClick={add} className="text-sm text-purple-600">+ Add link</button>
        <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium">Download HTML</button>
      </div>
      <div className="rounded-2xl overflow-hidden p-6 flex items-center justify-center" style={{backgroundColor:bg,minHeight:400}}>
        <div className="w-full max-w-xs text-center">
          <h2 className="text-white text-xl font-bold mb-1">{name}</h2>
          <p className="text-white/80 text-sm mb-6">{bio}</p>
          {links.filter(l=>l.title).map((l,i) => (
            <div key={i} className="block p-3 bg-white/15 border border-white/20 rounded-xl text-white text-sm font-medium mb-3">{l.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
