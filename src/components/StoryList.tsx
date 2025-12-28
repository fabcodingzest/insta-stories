import { type User } from "../constants/user";
import StoryItem from "./StoryItem";

interface StoryListProps {
  handleStoryClick: (clickedUserIndex: number) => void;
  users: User[];
}

function StoryList({ handleStoryClick, users }: StoryListProps) {
  return (
    <div className="flex gap-10 overflow-x-auto px-2 py-4 bg-white border-y-gray-400 border-y-2">
      {users?.map((item, i) => {
        return <StoryItem key={i} index={i} data={item} handleStoryClick={handleStoryClick} />;
      })}
    </div>
  );
}

export default StoryList;
