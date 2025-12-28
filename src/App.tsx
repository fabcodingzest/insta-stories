import { useState } from "react";
import "./App.css";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import { storyData } from "./constants/user";

function App() {
  const [showStoryView, setShowStoryView] = useState(false);
  const [startUserIndex, setStartUserIndex] = useState(0);

  // Filtering users with stories
  const usersWithStories = storyData.users.filter((user) => user.stories.length > 0);

  const handleStoryClick = (clickedUserIndex: number) => {
    const clickedUser = storyData.users[clickedUserIndex];
    const indexInFilteredArray = usersWithStories.findIndex((user) => user.id === clickedUser.id);
    setStartUserIndex(indexInFilteredArray);
    setShowStoryView(true);
  };

  const handleCloseStoryViewer = () => {
    console.log("Closing story view");
    setShowStoryView(false);
    setStartUserIndex(0);
  };

  return (
    <div className="max-w-sm mx-auto border-x-2 border-x-black h-dvh">
      <h1 className="bg-gray-200 p-2 font-semibold text-xl text-black">Instagram Stories</h1>
      <StoryList users={usersWithStories} handleStoryClick={handleStoryClick} />

      {showStoryView && (
        <StoryViewer
          startUserIndex={startUserIndex}
          users={usersWithStories}
          onClose={handleCloseStoryViewer}
        />
      )}
    </div>
  );
}

export default App;
