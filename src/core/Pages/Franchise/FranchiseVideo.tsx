// src/core/Pages/Franchise/FranchiseVideo.tsx
import React from "react";

const FranchiseVideo: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-10 text-center">
          <h2 className="mb-4 american text-dark-olive-bark">
            See Our Franchise in Action
          </h2>
          <p className="max-w-3xl mx-auto text-lg font-bold open-sans text-dark-olive-bark">
            Watch our franchise video to learn more about the Nash & Smashed
            opportunity and what makes our brand unique in the fast-casual
            market.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <video
              className="w-full h-auto"
              controls
              preload="auto"
              poster="/images/poster/nash-and-smashed-aerial-footage-of-dumfries-virginia-location.jpg"
            >
              <source
                src="/videos/nash-and-smashed-franchise-video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="text-center mt-9">
            <a
              href="/pdfs/nash-and-smashed-franchise-brouchure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-bold transition-all rounded-md open-sans text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500 focus:ring-2 focus:ring-lightning-yellow-300"
            >
              Download Our Franchise Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseVideo;
