"use client";
import { Waves, Github, Linkedin, X } from 'lucide-react';

export default function Footer(){
    return(
      <footer className="footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand Section */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Waves className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <span className="text-white font-medium">Sui Profile</span>
                <p className="text-slate-300 text-xs">Built on Sui Network</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/LukoOG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/emmanuel-adesipe-79b901365"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Sipe_OG1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
                aria-label="X (Twitter)"
              >
                <X className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-xs text-slate-400">
              © 2024 Sui Profile. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    )
}