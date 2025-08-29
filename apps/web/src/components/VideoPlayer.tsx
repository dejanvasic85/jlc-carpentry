import MuxPlayer from '@mux/mux-player-react';

type VideoPlayerProps = {
  playbackId: string;
  aspectRatio: number;
};

export function VideoPlayer({ playbackId, aspectRatio }: VideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: aspectRatio,
      }}
    />
  );
}
