import { useState } from 'react';

export default function Logo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative w-36 h-10 sm:w-40 sm:h-12 md:w-48 md:h-14 lg:w-56 lg:h-16 transition-opacity duration-500 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src="/logo.png"
        alt="Logo"
        className="w-full h-full object-contain"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
