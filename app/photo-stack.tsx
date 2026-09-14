"use client";

import { useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const previews = [
  {
    src: `${basePath}/images/art-preview.jpg?v=2`,
    alt: "Malik's Daycare playroom with colorful floor mats",
  },
  {
    src: `${basePath}/images/playroom-preview.jpg?v=2`,
    alt: "Malik's Daycare playroom with books, toys, and activity mats",
  },
  {
    src: `${basePath}/images/blocks-preview.jpg?v=2`,
    alt: "Malik's Daycare toy shelves and colorful learning rug",
  },
  {
    src: `${basePath}/images/reading-preview.jpg?v=2`,
    alt: "Quiet rest room at Malik's Daycare",
  },
  {
    src: `${basePath}/images/outdoor-preview.jpg?v=2`,
    alt: "Outdoor play area at Malik's Daycare",
  },
];

export function PhotoStack() {
  const [{ index, previous }, setPhoto] = useState<{
    index: number;
    previous: number | null;
  }>({ index: 0, previous: null });

  function changePhoto(direction: number) {
    setPhoto((current) => ({
      index: (current.index + direction + previews.length) % previews.length,
      previous: current.index,
    }));
  }

  return (
    <div
      className="photo-stack"
      role="region"
      aria-roledescription="carousel"
      aria-label="Daycare preview photos"
    >
      <div className="photo-stack-stage">
        <div className="photo-stack-deck">
          {previews.map((photo, photoIndex) => {
            const depth =
              (photoIndex - index + previews.length) % previews.length;
            return (
              <span
                key={photo.src}
                className="photo-stack-card"
                aria-hidden={depth !== 0}
                style={
                  {
                    "--depth": depth,
                    "--tilt": `${depth === 0 ? 0 : depth % 2 ? -3 : 3}deg`,
                    zIndex: previews.length - depth,
                  } as CSSProperties
                }
              >
                <img
                  src={photo.src}
                  alt={depth === 0 ? photo.alt : ""}
                  width="1000"
                  height="750"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="photo-stack-label">Malik&apos;s Daycare</span>
              </span>
            );
          })}
          {previous !== null && (
            <span
              key={index}
              className="photo-stack-card photo-stack-outgoing"
              aria-hidden="true"
              onAnimationEnd={() =>
                setPhoto((current) =>
                  current.index === index
                    ? { ...current, previous: null }
                    : current,
                )
              }
            >
              <img
                src={previews[previous].src}
                alt=""
                width="1000"
                height="750"
                draggable={false}
              />
              <span className="photo-stack-label">Malik&apos;s Daycare</span>
            </span>
          )}
        </div>
      </div>
      <div className="photo-stack-controls">
        <button
          type="button"
          className="icon-button"
          aria-label="Previous preview photo"
          title="Previous photo"
          onClick={() => changePhoto(-1)}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span aria-live="polite" aria-atomic="true">
          {index + 1} of {previews.length}
        </span>
        <button
          type="button"
          className="icon-button"
          aria-label="Next preview photo"
          title="Next photo"
          onClick={() => changePhoto(1)}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
