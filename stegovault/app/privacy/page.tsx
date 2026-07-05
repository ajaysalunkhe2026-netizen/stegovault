export default function PrivacyPolicy() {
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
          <h1 className="text-5xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: July 05, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              StegoVault ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you use our website and tool at stegovault-blond.vercel.app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p>
              <strong>StegoVault does not collect or store any personal data.</strong><br /><br />
              All encryption, decryption, and image processing happens <strong>entirely in your browser</strong>. 
              Your images and passwords never leave your device.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>We do not store your images, passwords, or encrypted files.</li>
              <li>We do not use cookies for tracking.</li>
              <li>We do not collect any personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Information</h2>
            <p>
              Since we do not collect any data, we do not use your information for any purpose. 
              The tool is designed to work completely offline after the page loads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p>
              Your data security is our top priority. Because all processing happens locally in your browser:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>No data is transmitted to our servers.</li>
              <li>No third parties can access your images or passwords.</li>
              <li>Encryption is performed using industry-standard AES-256 algorithm.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <p>
              We use Vercel for hosting. Vercel may collect standard web server logs 
              (such as IP address and browser type) as part of normal website operation. 
              This data is not linked to your usage of the StegoVault tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted 
              on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br />
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