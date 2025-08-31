import MuxPlayer from '@mux/mux-player-react';
import { useRef, useState } from 'react';
import { gtag } from './GoogleTagManager';

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
  serviceName?: string;
};

type ViewingMilestones = {
  started: boolean;
  quarter: boolean;
  half: boolean;
  threeQuarters: boolean;
  completed: boolean;
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
  serviceName,
}: StandardVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [milestones, setMilestones] = useState<ViewingMilestones>({
    started: false,
    quarter: false,
    half: false,
    threeQuarters: false,
    completed: false,
  });

  const trackVideoEvent = (eventName: string, additionalData: Record<string, unknown> = {}) => {
    gtag.event(`video_${eventName}`, {
      video_title: title || 'Service video',
      video_url: src,
      service_name: serviceName,
      category: 'video_engagement',
      ...additionalData,
    });
  };

  const handlePlay = () => {
    if (!milestones.started) {
      trackVideoEvent('start');
      setMilestones((prev) => ({ ...prev, started: true }));
    } else {
      trackVideoEvent('resume');
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (video) {
      trackVideoEvent('pause', {
        current_time: Math.round(video.currentTime),
        duration: Math.round(video.duration),
        progress_percentage: Math.round((video.currentTime / video.duration) * 100),
      });
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    const progress = (video.currentTime / video.duration) * 100;

    if (progress >= 25 && !milestones.quarter) {
      trackVideoEvent('progress', { milestone: '25%' });
      setMilestones((prev) => ({ ...prev, quarter: true }));
    } else if (progress >= 50 && !milestones.half) {
      trackVideoEvent('progress', { milestone: '50%' });
      setMilestones((prev) => ({ ...prev, half: true }));
    } else if (progress >= 75 && !milestones.threeQuarters) {
      trackVideoEvent('progress', { milestone: '75%' });
      setMilestones((prev) => ({ ...prev, threeQuarters: true }));
    }
  };

  const handleEnded = () => {
    if (!milestones.completed) {
      trackVideoEvent('complete');
      setMilestones((prev) => ({ ...prev, completed: true }));

      // Track service engagement when video is completed
      if (serviceName) {
        gtag.trackService(serviceName, 'video_completed');
      }
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        controls
        className={`w-full rounded-lg ${className}`}
        style={{ aspectRatio }}
        preload="metadata"
        poster={poster}
        aria-label={title || 'Video content'}
        aria-describedby={description ? 'video-description' : undefined}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
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
