import { type Dispatch, type SetStateAction } from "react";
import type { User } from "../constants/user";

interface StoryViewerProps {
  openStories: Dispatch<SetStateAction<boolean>>;
  users: User[];
}

function StoryViewer({ openStories }: StoryViewerProps) {
  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-all duration-300 ease-out"
      // style={{
      //   transform: `scale(${scale})`,
      //   opacity: scale,
      // }}
    >
      StoryViewer
      <button onClick={() => openStories(false)}>Close Me</button>
    </div>
  );
}

export default StoryViewer;
