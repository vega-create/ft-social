import { useState, useRef } from 'react';

const sizes: [string,number,number][] = [
  ['Instagram Post',1080,1080],['Instagram Story',1080,1920],['Instagram Reel',1080,1920],
  ['Facebook Post',1200,630],['Facebook Cover',820,312],['Facebook Story',1080,1920],
  ['Twitter Post',1200,675],['Twitter Header',1500,500],
  ['LinkedIn Post',1200,627],['LinkedIn Cover',1584,396],
  ['YouTube Thumbnail',1280,720],['Pinterest Pin',1000,1500],
  ['TikTok',1080,1920],
];

export default function SocialImageResize() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [selected, setSelected] = useState(sizes[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const image = new Image(); image.onload = () => setImg(image); image.src = URL.createObjectURL(f);
  };

  const download = () => {
    if (!img) return;
    const c = document.createElement('canvas'); c.width = selected[1]; c.height = selected[2];
    const ctx = c.getContext('2d')!;
    const scale = Math.max(selected[1]/img.width, selected[2]/img.height);
    const w = img.width * scale, h = img.height * scale;
    ctx.drawImage(img, (selected[1]-w)/2, (selected[2]-h)/2, w, h);
    const a = document.createElement('a'); a.download = `${selected[0].replace(/ /g,'-').toLowerCase()}-${selected[1]}x${selected[2]}.png`;
    a.href = c.toDataURL('image/png'); a.click();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">📐</div>
        <p className="text-gray-600 font-medium">{img ? 'Image loaded ✓' : 'Click to upload an image'}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sizes.map(s => (
          <button key={s[0]} onClick={() => setSelected(s)} className={`p-3 rounded-xl text-left text-sm ${selected[0]===s[0]?'bg-purple-600 text-white':'bg-white border border-gray-100 hover:border-purple-200'}`}>
            <div className="font-medium">{s[0]}</div>
            <div className={`text-xs ${selected[0]===s[0]?'text-purple-200':'text-gray-400'}`}>{s[1]}×{s[2]}</div>
          </button>
        ))}
      </div>
      {img && <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Download {selected[1]}×{selected[2]}</button>}
    </div>
  );
}
