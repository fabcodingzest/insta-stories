import type { User } from "../constants/user";

interface StoryItemType {
  data: User;
  openStories: () => void;
}

function StoryItem({ data, openStories }: StoryItemType) {
  const { stories, username, avatar } = data;
  return (
    <div className="flex-col justify-center items-center" onClick={openStories}>
      <div
        className={`rounded-full w-22 overflow-hidden flex justify-center items-center transition-all duration-200 ${
          stories.length > 0 ? "border-4 border-pink-800" : "border-4 border-gray-500"
        }`}
      >
        <img src={avatar} alt={username} className="rounded-full w-20 h-20 object-cover p-0.5" />
      </div>
      <h2 className="text-center text-sm mt-1 max-w-20 truncate">{username}</h2>
    </div>
  );
}

export default StoryItem;
