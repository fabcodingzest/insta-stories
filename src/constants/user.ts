export interface Story {
  id: number;
  image: string;
}

export interface User {
  id: number;
  username: string;
  avatar: string;
  stories: Story[];
}

export interface StoryDataType {
  users: User[];
}

export const storyData: StoryDataType = {
  users: [
    {
      id: 1,
      username: "user1",
      avatar: "/assets/avatar/user-1.jpg",
      stories: [
        { id: 1, image: "/assets/stories/user1-story.jpeg" },
        { id: 2, image: "/assets/stories/user1-story2.jpeg" },
      ],
    },
    {
      id: 2,
      username: "user2",
      avatar: "/assets/avatar/user-2.jpg",
      stories: [{ id: 3, image: "/assets/stories/user2-story.jpg" }],
    },
    {
      id: 3,
      username: "user3",
      avatar: "/assets/avatar/user-3.jpg",
      stories: [
        { id: 1, image: "/assets/stories/user1-story2.jpeg" },
        { id: 2, image: "/assets/stories/user1-story.jpeg" },
      ],
    },
    {
      id: 4,
      username: "user4",
      avatar: "/assets/avatar/user-4.jpg",
      stories: [{ id: 3, image: "/assets/stories/user2-story.jpg" }],
    },
  ],
};
