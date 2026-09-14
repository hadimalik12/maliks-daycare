"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const photos = [
  {
    src: `${basePath}/images/playroom-wide.jpg?v=3`,
    alt: "Malik's Daycare playroom with books, toys, and activity mats",
    label: "Main playroom",
    width: 2048,
    height: 1536,
  },
  {
    src: `${basePath}/images/playroom-learning-wall.jpg?v=3`,
    alt: "Malik's Daycare playroom with a colorful learning wall and alphabet rug",
    label: "Learning and activity area",
    width: 1536,
    height: 2048,
  },
  {
    src: `${basePath}/images/nap-room.jpg?v=3`,
    alt: "Quiet nap and rest room at Malik's Daycare",
    label: "Quiet nap room",
    width: 2048,
    height: 1536,
  },
  {
    src: `${basePath}/images/outdoor-play-area.jpg?v=3`,
    alt: "Malik's Daycare outdoor play area with slides and a basketball hoop",
    label: "Outdoor play area",
    width: 2048,
    height: 1536,
  },
];

export function PhotoGallery() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function showPhoto(nextIndex: number) {
    setIndex((nextIndex + photos.length) % photos.length);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStartX.current === null) return;

    const distance = clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 45) return;
    showPhoto(index + (distance < 0 ? 1 : -1));
  }

  return (
    <div
      className="photo-gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of Malik's Daycare"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      onTouchCancel={() => {
        touchStartX.current = null;
      }}
    >
      <figure className="preview-photo hero-photo">
        {photos.map((photo, photoIndex) => (
          <img
            key={photo.src}
            className="photo-gallery-image"
            src={photo.src}
            alt={photoIndex === index ? photo.alt : ""}
            width={photo.width}
            height={photo.height}
            fetchPriority={photoIndex === 0 ? "high" : "auto"}
            loading={photoIndex === 0 ? "eager" : "lazy"}
            sizes="(min-width: 900px) 44vw, (min-width: 600px) 600px, calc(100vw - 40px)"
            draggable={false}
            data-active={photoIndex === index}
            aria-hidden={photoIndex !== index}
          />
        ))}
        <figcaption aria-live="polite">{photos[index].label}</figcaption>
        <button
          type="button"
          className="photo-gallery-arrow photo-gallery-previous"
          aria-label="Show previous photo"
          title="Previous photo"
          onClick={() => showPhoto(index - 1)}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="photo-gallery-arrow photo-gallery-next"
          aria-label="Show next photo"
          title="Next photo"
          onClick={() => showPhoto(index + 1)}
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </figure>
      <div className="photo-gallery-footer">
        <div className="photo-gallery-dots" aria-label="Choose a photo">
          {photos.map((photo, photoIndex) => (
            <button
              type="button"
              key={photo.src}
              aria-label={`Show ${photo.label.toLowerCase()}`}
              aria-current={photoIndex === index ? "true" : undefined}
              onClick={() => showPhoto(photoIndex)}
            />
          ))}
        </div>
        <span aria-live="polite" aria-atomic="true">
          {index + 1} of {photos.length}
        </span>
      </div>
    </div>
  );
}
