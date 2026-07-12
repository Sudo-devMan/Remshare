import { useEffect } from "react";

export default function Paused() {
  useEffect(() => {
    document.title = "Under Maintenance";
  }, []);
  return (
    <div className="w-full h-screen text-3xl p-5 sm:p-1 flex-col bg-green-100 text-blue-800 flex justify-center items-center">
      <h1 className="bangers-font text-5xl">EKSE! WE BUSY BRUH.</h1>
      <p className="caveat">
        Remshare is currently under maintenance. We will be back soon ska wara
        :)
      </p>
      <h3 className="caveat">
        <a target="_blank" href="https://wa.me/0720727038">
          Press here to WhatsApp the developer and ask what's going on
        </a>
      </h3>
    </div>
  );
}
