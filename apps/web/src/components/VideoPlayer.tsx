import MuxPlayer from '@mux/mux-player-react';

type MuxVideoPlayerProps = {
  playbackId: string;
  aspectRatio: number;
};

type StandardVideoPlayerProps = {
  src: string;
  title?: string;
  description?: string;
  transcript?: string;
  poster?: string;
  aspectRatio?: number;
  className?: string;
};

export function MuxVideoPlayer({ playbackId, aspectRatio }: MuxVideoPlayerProps) {
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

export function VideoPlayer({
  src,
  title,
  description,
  transcript,
  poster,
  aspectRatio = 16 / 9,
  className = '',
}: StandardVideoPlayerProps) {
  return (
    <div className="relative">
      <video
        controls
        className={`w-full rounded-lg ${className}`}
        style={{ aspectRatio }}
        preload="metadata"
        poster={poster}
        aria-label={title || 'Video content'}
        aria-describedby={description ? 'video-description' : undefined}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      
      {/* Screen reader description */}
      {description && (
        <div id="video-description" className="sr-only">
          {description}
        </div>
      )}
      
      {/* Transcript for accessibility */}
      {transcript && (
        <details className="mt-4">
          <summary className="font-medium text-jlc-black cursor-pointer hover:text-jlc-blue transition-colors">
            View Transcript
          </summary>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg text-sm leading-relaxed">
            {transcript.split('\n').map((line, index) => (
              <p key={index} className={line.trim() === '' ? 'mb-2' : 'mb-1'}>
                {line}
              </p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
