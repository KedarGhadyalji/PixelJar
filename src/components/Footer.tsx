import { Blocks, GitFork } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-900 bg-[#05050a]/40 mt-auto w-full">
      {/* Sleek top edge layout gradient divider line */}
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-gray-800/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Side: Brand & Credit */}
          <div className="flex items-center gap-2.5 text-gray-500 text-xs font-medium text-center sm:text-left">
            <Blocks className="size-4 text-blue-500/60" />
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-gray-400 font-semibold">PixelJar</span>.
              Built for developers, by a developer.
            </p>
          </div>

          {/* Right Side: GitHub Open Source Call to Action */}
          <Link
            href="https://github.com/KedarGhadyalji/PixelJar" // Replace with your actual GitHub repository URL
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900/60 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 font-medium text-xs text-gray-400 hover:text-white transition-all duration-200 group"
          >
            <BsGithub className="size-4" />
            <span>Open Source</span>
            <span className="text-gray-600 group-hover:text-gray-400">|</span>
            <span className="flex items-center gap-1 text-gray-500 group-hover:text-blue-400">
              <GitFork className="size-3" />
              Contribute
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
