export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-semibold tracking-tight">StegoVault</span>
          </a>
          <a 
            href="/" 
            className="px-5 py-2 text-sm border border-white/20 rounded-full hover:bg-white hover:text-black transition"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-3">About Me</h1>
          <p className="text-xl text-gray-400">Ajay Salunkhe</p>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-[15px] leading-relaxed">
          
          <p>
            Hello, I'm <strong>Ajay Salunkhe</strong>. I enjoy building tools that solve real problems 
            in simple and practical ways.
          </p>

          <p>
            I like experimenting with new technologies and creating custom tools that can be useful 
            for others. My focus is on understanding what users actually need and then building 
            solutions around that.
          </p>

          <div>
            <h3 className="text-white text-xl font-semibold mb-3">What I Do</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Try to build new tools from scratch</li>
              <li>Improve existing tools based on real feedback</li>
              <li>Experiment with different technologies and approaches</li>
              <li>Take user feedback seriously and upgrade tools accordingly</li>
              <li>Create custom tools as per specific requirements</li>
            </ul>
          </div>

          <p>
            I believe that good tools are built by listening to users and continuously improving. 
            Every piece of feedback helps in making the tool better and more useful.
          </p>

          <p>
            Currently, I am working on <strong>StegoVault</strong> and plan to keep improving it 
            based on suggestions and real-world usage.
          </p>

          <div className="pt-6 border-t border-white/10">
            <p className="text-gray-400">
              If you have any suggestions, feedback, or ideas for new tools, feel free to reach out. 
              I'm always open to learning and building better solutions.
            </p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ajay Salunkhe
        </div>
      </div>
    </div>
  );
}