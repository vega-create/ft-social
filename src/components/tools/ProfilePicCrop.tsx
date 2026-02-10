import { useState, useRef } from 'react';

export default function ProfilePicCrop() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [size, setSize] = useState(400);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const image = new Image(); image.onload = () => setImg(image); image.src = URL.createObjectURL(f);
  };

  const download = (circle: boolean) => {
    if (!img) return;
    const c = document.createElement('canvas'); c.width = size; c.height = size;
    const ctx = c.getContext('2d')!;
    if (circle) { ctx.beginPath(); ctx.arc(size/2,size/2,size/2,0,Math.PI*2); ctx.clip(); }
    const scale = Math.max(size/img.width, size/img.height);
    const w = img.width*scale, h = img.height*scale;
    ctx.drawImage(img, (size-w)/2, (size-h)/2, w, h);
    const a = document.createElement('a'); a.download = `profile-${size}x${size}.png`;
    a.href = c.toDataURL('image/png'); a.click();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">⭕</div>
        <p className="text-gray-600 font-medium">{img ? 'Image loaded ✓' : 'Click to upload'}</p>
      </div>
      {img && (
        <>
          <div className="flex justify-center"><div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-200"><img src={img.src} alt="" className="w-full h-full object-cover" /></div></div>
          <div><label className="text-sm text-gray-500">Size: {size}px</label>
            <div className="flex gap-2 mt-1">{[200,400,600,800].map(s => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-lg text-sm ${size===s?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{s}px</button>
            ))}</div></div>
          <div className="flex gap-2">
            <button onClick={() => download(true)} className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-medium">⭕ Circle</button>
            <button onClick={() => download(false)} className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-medium">⬜ Square</button>
          </div>
        </>
      )}
    </div>
  );
}
