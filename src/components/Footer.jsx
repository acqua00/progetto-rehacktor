export default function Footer() {
  return (
    <footer className="
      w-full
      bg-gradient-to-b from-[#0d1117] to-[#0b0f14]
      text-gray-400
      border-t border-gray-800
      py-8 px-6
      mt-10
    ">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">

  
        <div className="h-px w-24 bg-gray-700/40"></div>

    
        <p className="text-sm tracking-wide text-gray-500 hover:text-gray-300 transition">
          © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">Rehacktor</span>.  
          All rights reserved.
        </p>

    
        <div className="text-xs text-gray-600">
          Made with ❤️ by the Rehacktor team
        </div>
      </div>
    </footer>
  );
}
