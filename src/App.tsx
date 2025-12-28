import { useState } from "react";
import "./App.css";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import { storyData } from "./constants/user";

function App() {
  const [showStories, setShowStories] = useState(false);

  // Filtering users with stories
  const usersWithStories = storyData.users.filter((user) => user.stories.length > 0);

  const handleStoryClick = () => {
    setShowStories(true);
  };

  return (
    <div className="max-w-sm mx-auto border-x-2 border-x-black h-dvh">
      <h1 className="bg-gray-200 p-2 font-semibold text-xl text-black">Instagram Stories</h1>
      <StoryList users={usersWithStories} openStories={handleStoryClick} />

      {showStories && <StoryViewer users={usersWithStories} openStories={setShowStories} />}
    </div>
  );
}

export default App;
