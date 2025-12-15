import "./remotion.css";
import React from "react";
import {
  useCurrentFrame,
  Sequence,
  Img,
  AbsoluteFill,
  Html5Audio,
  useVideoConfig,
} from "remotion";

export const Video = ({ bgImage, audio, subtitles }) => {
  const words = subtitles?.words || [];

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  
  const cleaned = words.map((w) => ({
    text: w.text.trim(),
    start: w.start / 1000, // ms → seconds
    end:
      w.end === w.start
        ? w.start / 1000 + 0.2
        : w.end / 1000 + 0.05, // slight linger for lyrics
  }));

  if (!cleaned.length) return null;

  /**
   * Chunk words into groups (max 5 words)
   */
  function chunkWords(list, size = 5) {
    const chunks = [];
    for (let i = 0; i < list.length; i += size) {
      const slice = list.slice(i, i + size);
      chunks.push({
        text: slice.map((w) => w.text).join(" "),
        start: slice[0].start,
        end: slice[slice.length - 1].end,
      });
    }
    return chunks;
  }

  let chunks = chunkWords(cleaned);

  /**
   * Auto line break for long text
   */
  function splitLines(text) {
    const arr = text.split(" ");
    if (arr.length <= 2) return text;
    const mid = Math.ceil(arr.length / 2);
    return (
      arr.slice(0, mid).join(" ") +
      "<br/>" +
      arr.slice(mid).join(" ")
    );
  }

  chunks = chunks.map((c) => ({
    ...c,
    finalText: c.text.length > 20 ? splitLines(c.text) : c.text,
  }));

  /**
   * Hold subtitle until next one starts
   */
  for (let i = 0; i < chunks.length - 1; i++) {
    chunks[i].end = chunks[i + 1].start;
  }

  const finalSubs = chunks;

  /**
   * Background slow zoom
   */
  const zoomScale = 1 + frame / (fps * 1500);

  return (
    <AbsoluteFill>
      {/* Background */}
      <Img
        src={bgImage}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoomScale})`,
        }}
      />

      {/* Audio */}
      <Html5Audio src={audio} />

      {/* Subtitles */}
      <AbsoluteFill style={{ zIndex: 10 }}>
        {finalSubs.map((s, i) => {
          /**
           * Time (seconds) → frames
           */
          const from = Math.floor(s.start * fps);
          const to = Math.floor(s.end * fps);
          const duration = Math.max(to - from, 1);

          const elapsed = frame - from;

          /**
           * Smooth fade in/out
           */
          const appear = Math.min(1, elapsed / (fps * 0.35));
          const disappear = Math.min(1, (to - frame) / (fps * 0.35));

          const fadeIn = appear ** 1.7;
          const fadeOut = disappear ** 1.7;
          const opacity = fadeIn * fadeOut;

          const slide = (1 - fadeIn) * 15;
          const scale = 1 + (1 - fadeIn) * 0.08;

          return (
            <Sequence key={i} from={from} durationInFrames={duration}>
              <div
                style={{
                  position: "absolute",
                  bottom: "40%",
                  width: "100%",
                  textAlign: "center",
                  fontSize: 80,
                  fontFamily: "MyFont",
                  color: "white",
                  WebkitTextStroke: "3px black",
                  textShadow: "0 0 10px rgba(0,0,0,0.8)",
                  opacity,
                  transform: `translateY(${slide}px) scale(${scale})`,
                }}
                dangerouslySetInnerHTML={{
                  __html: s.finalText.toUpperCase(),
                }}
              />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
