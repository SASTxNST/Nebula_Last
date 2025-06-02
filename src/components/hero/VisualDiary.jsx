"use client";
import Image from "next/image";
import React from "react";

const galleryItemsData = [
  {
    id: 1,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQF4Wegh7XXgVw/feedshare-shrink_1280/feedshare-shrink_1280/0/1728942689918?e=1751500800&v=beta&t=bHBFBxGTOjhEdJiQ_iQdRNObhGz-4411KuROzIN-EEw",
    alt: "Nebula Competition participants focused on coding",
  },
  {
    id: 2,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQHkR3l3uvbJvA/feedshare-shrink_1280/feedshare-shrink_1280/0/1728942690953?e=1751500800&v=beta&t=4A-7BqttoUwv0NwebAG3hJ-GqU4WPKAqWKMXGZdZ2qY",
    alt: "Team members collaborating during the Nebula Competition",
  },
  {
    id: 3,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQFuxlOplh1u3Q/feedshare-shrink_1280/feedshare-shrink_1280/0/1728940285794?e=1751500800&v=beta&t=hkf_P7hhsO2xx4yctgO0b_E-9CYicNbCZ6d_DvjEKCU",
    alt: "A group of participants discussing ideas",
  },
  {
    id: 4,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQFiVwDI4v-imA/feedshare-shrink_1280/feedshare-shrink_1280/0/1728940285799?e=1751500800&v=beta&t=tgb116MhMKuOomwHYTqZ0t1DIocpylrrXX5dRijRCeo",
    alt: "Participants listening to a presentation",
  },
  {
    id: 5,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQGqnvTlEWd4WA/feedshare-shrink_1280/B4DZPRSOQvHYAo-/0/1734383036186?e=1751500800&v=beta&t=2okc21iIRvIXWQ5xITk63nNGxUYPrnOCkdVyCXMuMrc",
    alt: "Attendees of a SAST event",
  },
  {
    id: 6,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQFV_tuSiUktAA/feedshare-shrink_1280/B4DZPRSOQjG0Ak-/0/1734383036152?e=1751500800&v=beta&t=unhoCbB6FQqHr_DnVAPLfYMmikwTuts04jDv_lyp07o",
    alt: "SAST members engaged in a workshop",
  },
  {
    id: 7,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQHM4q1GDVpLZA/feedshare-shrink_2048_1536/B4DZUVYeUIG4As-/0/1739820493491?e=1751500800&v=beta&t=0IBVgpg1GlJR50MKdLpvdpK_ICGoNsfluL2yd22sim4",
    alt: "Group photo at a SAST event",
  },
  {
    id: 8,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQGvA63KzfUuYw/feedshare-shrink_2048_1536/B4DZUVYeUGHYAo-/0/1739820496642?e=1751500800&v=beta&t=XCzAXhI-17aTS5ap3YuAmL-mFKqgdWKjpgWDlo0HxeI",
    alt: "Interactive session at an event",
  },
];

const VisualDiary = () => {
  return (
    <div className="flex h-screen flex-col bg-black px-4 pb-6 pt-[72px] text-white">
      <div className="mx-auto flex w-full flex-1 flex-col max-w-7xl">
        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-1 text-3xl font-bold md:text-4xl">Gallery</h1>
          <p className="text-sm text-gray-400 md:text-base">
            A collection of moments frozen in time
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-auto px-1 sm:grid-cols-3 md:grid-cols-4 md:px-0">
          {galleryItemsData.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg">
              <Image
                src={item.src}
                alt={item.alt}
                width={300}
                height={256}
                className="h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualDiary;