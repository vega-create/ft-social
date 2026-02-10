import { useState } from 'react';

export default function TextToImage() {
  const [text, setText] = useState('Your quote here ✨');
  const [bg, setBg] = useState('#7C3AED');
  const [fg, setFg] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(36);
  const [w, setW] = useState(1080);
  const [h, setH] = useState(1080);

  const download = () => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = fg; ctx.font = `bold ${fontSize}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lines = text.split('\n');
    const lineH = fontSize * 1.4;
    const startY = h/2 - (lines.length - 1) * lineH / 2;
    lines.forEach((line, i) => ctx.fillText(line, w/2, startY + i * lineH, w * 0.85));
    const a = document.createElement('a'); a.download = 'quote.png'; a.href = c.toDataURL('image/png'); a.click();
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} className="w-full h-28 p-4 border border-gray-200 rounded-xl outline-none" />
      <div className="grid sm:grid-cols-4 gap-3">
        <div><label className="text-xs text-gray-500">Background</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
        <div><label className="text-xs text-gray-500">Text Color</label><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
        <div><label className="text-xs text-gray-500">Font Size</label><input type="number" value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Size</label>
          <select onChange={e => {const[a,b]=e.target.value.split('x');setW(+a);setH(+b);}} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="1080x1080">Square 1080</option><option value="1080x1920">Story 1080×1920</option><option value="1200x630">Facebook 1200×630</option><option value="1200x675">Twitter 1200×675</option>
          </select></div>
      </div>
      <div className="rounded-xl overflow-hidden flex items-center justify-center" style={{backgroundColor:bg,aspectRatio:`${w}/${h}`,maxHeight:300}}>
        <p style={{color:fg,fontSize:Math.min(fontSize,32)+'px'}} className="font-bold text-center px-4 whitespace-pre-wrap">{text}</p>
      </div>
      <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Download {w}×{h}</button>
    </div>
  );
}
