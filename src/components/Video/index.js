import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import "./index.scss";

export default function Video({
  width = "100%",
  height = "auto",
  sources = [],
  tracks = [],
  thumbnail = null,
}) {
  return (
    <div className="Video rounded" style={{ width, height }}>
      <Plyr
        controls
        source={{
          type: "video",
          poster: thumbnail,
          tracks,
          sources,
        }}
        options={{
          enabled: true,
          autoplay: false,
          muted: true,
          playsinline: true,
          clickToPlay: false,
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            //   "pip",
            "fullscreen",
          ],
          // tooltips: { controls: true, seek: true },
          // settings: ["captions", "quality", "speed", "loop"],
          // speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
          // captions: { active: true, language: "auto", update: true },
          // loop: { active: true },
        }}
      />
    </div>
  );
}
