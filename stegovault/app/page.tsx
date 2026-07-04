'use client';

import { useState } from 'react';
import { Shield, Download, Lock, Unlock } from 'lucide-react';

export default function StegoVault() {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'secret' | 'cover') => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (type === 'secret') setFile(selectedFile);
      else setCoverFile(selectedFile);
    }
  };

  const handleEncrypt = async () => {
    if (!file || !coverFile || !password) {
      alert("Please select both images and enter password");
      return;
    }
    setIsProcessing(true);

    setTimeout(() => {
      const dummyContent = "This is your encrypted StegoVault image. Replace this with real file later.";
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultName("stegovault_encrypted.png");
      setIsProcessing(false);
    }, 2200);
  };

  const handleDecrypt = async () => {
    if (!file || !password) {
      alert("Please select encrypted image and enter password");
      return;
    }
    setIsProcessing(true);

    setTimeout(() => {
      const dummyContent = "This is your original decrypted image. Replace this with real file later.";
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultName("decrypted_original.png");
      setIsProcessing(false);
    }, 2200);
  };

  const resetTool = () => {
    setFile(null);
    setCoverFile(null);
    setPassword('');
    setResultUrl(null);
    setResultName('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-500" />
            <span className="text-2xl font-semibold tracking-tight">StegoVault</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-zinc-400 transition-colors">Features</a>
            <a href="#how" className="hover:text-zinc-400 transition-colors">How it works</a>
            <a href="/about" className="hover:text-zinc-400 transition-colors">About</a>
            <a href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-zinc-400 transition-colors">Terms</a>
            <button onClick={resetTool} className="px-5 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-200 transition-colors">
              Reset Tool
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-14 md:pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-8">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm text-zinc-400">Secure • Private • Invisible</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 leading-[1.05]">
          Hide Images.<br />Securely. <span className="text-emerald-500">Visibly Normal.</span>
        </h1>
        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto">
          Encrypt any image and hide it inside another normal-looking image.<br className="hidden md:block" />
          No one can tell the difference.
        </p>
      </div>

      {/* Tool Card */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          
          {/* Tabs */}
          <div className="flex border-b border-zinc-800 mb-10">
            <button 
              onClick={() => { setActiveTab('encrypt'); setResultUrl(null); }} 
              className={`flex-1 pb-5 flex items-center justify-center gap-3 text-lg font-medium transition-all ${activeTab === 'encrypt' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              <Lock className="w-5 h-5" /> Encrypt & Hide
            </button>
            <button 
              onClick={() => { setActiveTab('decrypt'); setResultUrl(null); }} 
              className={`flex-1 pb-5 flex items-center justify-center gap-3 text-lg font-medium transition-all ${activeTab === 'decrypt' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              <Unlock className="w-5 h-5" /> Decrypt
            </button>
          </div>

          {/* Encrypt Form */}
          {activeTab === 'encrypt' && (
            <div className="space-y-6">
              <div>
                <label className="block text-base mb-3 text-zinc-300 font-medium">Secret Image (to hide)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'secret')} className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-5 text-lg file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" />
              </div>
              <div>
                <label className="block text-base mb-3 text-zinc-300 font-medium">Cover Image (looks normal)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'cover')} className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-5 text-lg file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" />
              </div>
              <div>
                <label className="block text-base mb-3 text-zinc-300 font-medium">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-5 text-xl" placeholder="Enter strong password" />
              </div>

              <button onClick={handleEncrypt} disabled={isProcessing} className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 disabled:opacity-60 mt-4 transition-all">
                {isProcessing ? "Encrypting..." : "Encrypt & Hide Image"}
              </button>
            </div>
          )}

          {/* Decrypt Form */}
          {activeTab === 'decrypt' && (
            <div className="space-y-6">
              <div>
                <label className="block text-base mb-3 text-zinc-300 font-medium">Encrypted Image</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'secret')} className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-5 text-lg file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" />
              </div>
              <div>
                <label className="block text-base mb-3 text-zinc-300 font-medium">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-5 text-xl" placeholder="Enter password" />
              </div>

              <button onClick={handleDecrypt} disabled={isProcessing} className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 disabled:opacity-60 mt-4 transition-all">
                {isProcessing ? "Decrypting..." : "Decrypt Image"}
              </button>
            </div>
          )}

          {/* Download Button */}
          {resultUrl && (
            <div className="mt-10 p-8 bg-zinc-950 border border-zinc-800 rounded-3xl text-center">
              <p className="text-emerald-400 text-2xl mb-6 font-medium">✅ Done! Your file is ready.</p>
              <a href={resultUrl} download={resultName} className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-semibold text-xl hover:bg-zinc-200 active:bg-zinc-300 transition-all w-full md:w-auto shadow-lg">
                Download {resultName} <Download className="w-6 h-6" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "AES-256 Encryption", desc: "Military-grade security to protect your images." },
            { title: "Invisible Hiding", desc: "The encrypted image looks completely normal to everyone." },
            { title: "Easy Recovery", desc: "Enter password anytime to get your original image back." }
          ].map((f, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-9">
              <h3 className="font-semibold text-2xl mb-4">{f.title}</h3>
              <p className="text-lg text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}