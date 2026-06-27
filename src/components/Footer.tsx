export default function Footer() {
  return (
    <footer className="relative mt-16 md:mt-24">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-blue/30">
                <span className="text-white font-display font-extrabold text-xs">SP</span>
              </div>
              <span className="font-display font-bold text-lg text-navy-900">
                sp<span className="text-accent-blue">.</span>market
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Next-gen sport & cyber-sport marketplace with AI-powered discovery.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs px-2 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-semibold">
                AI Beta
              </span>
              <span className="text-xs text-gray-400">v1.0.0</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {["Footwear", "Esports", "Football", "Training", "Accessories"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-accent-blue transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Support</h4>
            <ul className="space-y-2.5">
              {["Help Center", "Shipping Info", "Returns", "Size Guide", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-accent-blue transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Careers", "Press", "AI Research", "Partners"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-accent-blue transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2026 sp.market. AI-Powered Sport Marketplace.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "Instagram", "GitHub", "Discord"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-gray-400 hover:text-accent-blue transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
