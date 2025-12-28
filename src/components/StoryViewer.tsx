import { useCallback, useEffect, useState } from "react";
import type { User } from "../constants/user";

interface StoryViewerProps {
  onClose: () => void;
  users: User[];
  startUserIndex: number;
}

const STORY_DURATION = 5000; // 5 second
const PROGRESS_INTERVAL = 50;
const progressIncrement = 100 / (STORY_DURATION / PROGRESS_INTERVAL);

function StoryViewer({ users, startUserIndex, onClose }: StoryViewerProps) {
  const [currentUserIndex, setCurrentUserIndex] = useState(startUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const totalStoriesInUser = currentUser?.stories.length || 0;

  const goToNextUser = useCallback(() => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  }, [currentUserIndex, users.length]);

  const goToPrevUser = useCallback(() => {
    if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = users[prevUserIndex];
      setCurrentUserIndex(prevUserIndex);
      setCurrentStoryIndex(prevUser.stories.length - 1);
      setProgress(0);
    }
  }, [currentUserIndex, users]);

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < totalStoriesInUser - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else if (currentUserIndex < users.length - 1) {
      goToNextUser();
    } else {
      // for last story of last user we close viewer
      onClose();
    }
  }, [
    currentStoryIndex,
    totalStoriesInUser,
    currentUserIndex,
    users.length,
    goToNextUser,
    onClose,
  ]);

  const goToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      goToPrevUser();
    } else {
      onClose();
    }
  }, [currentStoryIndex, currentUserIndex, goToPrevUser, onClose]);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement;

        if (next >= 100) {
          goToNextStory();
          return 100;
        }

        return next;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isLoading, currentStoryIndex, currentUserIndex, goToNextStory]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    setIsLoading(true);
  }, [currentStoryIndex, currentUserIndex]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative h-full max-w-sm mx-auto bg-gray-900">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white text-2xl">
          ✕
        </button>

        <div className="absolute top-2 left-2 right-2 flex gap-1 z-40">
          {currentUser.stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-gray-600/50 rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width:
                    index < currentStoryIndex
                      ? "100%"
                      : index === currentStoryIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-8 left-2 right-2 flex items-center gap-2 z-40">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-8 h-8 rounded-full border-2 border-white select-none pointer-events-none"
          />
          <span className="text-white font-semibold text-sm">{currentUser.username}</span>
        </div>

        <div className="h-full flex w-full select-none">
          <img
            src={currentStory?.image}
            alt="story"
            className="h-full w-full object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              console.error("Failed to load story image");
            }}
          />
        </div>
        <div className="absolute inset-0 flex">
          <div className="w-[40%] h-full cursor-pointer select-none" onClick={goToPreviousStory} />

          <div className="w-[60%] h-full cursor-pointer select-none" onClick={goToNextStory} />
        </div>
      </div>
    </div>
  );
}

export default StoryViewer;
