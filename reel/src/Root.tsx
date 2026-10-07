import React from 'react';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import { useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { Reel, DURATION } from './Reel';
import { FPS, H, W } from './theme';

/** Every frame waits for the course's two typefaces. */
function WithFonts() {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all([
      document.fonts.load("700 40px 'Inter Variable'"),
      document.fonts.load("800 40px 'Inter Variable'"),
      document.fonts.load("600 20px 'JetBrains Mono Variable'"),
    ]).then(() => document.fonts.ready).then(() => continueRender(handle));
  }, [handle]);
  return <Reel />;
}

export function Root() {
  return <Composition id="KatArchReel" component={WithFonts} durationInFrames={DURATION} fps={FPS} width={W} height={H} />;
}
