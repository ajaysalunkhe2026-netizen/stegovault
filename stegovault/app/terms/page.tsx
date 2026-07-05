export default function Terms() {
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
          <h1 className="text-5xl font-bold tracking-tight mb-3">Terms & Conditions</h1>
          <p className="text-gray-400">Last updated: July 05, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 space-y-8 text-[15px] leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using StegoVault, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, please do not use the tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use of the Tool</h2>
            <p>
              StegoVault is provided for personal and lawful use only. You may use the tool to encrypt 
              and hide images as per your requirements. You are solely responsible for the content 
              you process through this tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must not use StegoVault for any illegal or harmful activities.</li>
              <li>You are responsible for keeping your passwords secure.</li>
              <li>We do not store any of your data, so please maintain backups of important files.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. No Warranty</h2>
            <p>
              StegoVault is provided "as is" without any warranties. We do not guarantee that the tool 
              will be error-free or uninterrupted. Use it at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              We shall not be liable for any damages arising from the use or inability to use StegoVault, 
              including but not limited to data loss, unauthorized access, or any other issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. 
              Continued use of the tool after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact</h2>
            <p>
              If you have any questions regarding these Terms, please contact us at:<br />
              <strong>ajaysalunkhe2026@gmail.com</strong>
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StegoVault. All rights reserved.
        </div>
      </div>
    </div>
  );
}