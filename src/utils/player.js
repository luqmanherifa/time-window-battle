export const getPlayerData = () => {
  const stored = localStorage.getItem("playerData");
  if (stored) return JSON.parse(stored);
  return null;
};

export const savePlayerData = (data) => {
  localStorage.setItem("playerData", JSON.stringify(data));
};

export const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const getRandomColorPair = () => {
  const pairs = [
    {
      primary: "bg-pink-500",
      secondary: "bg-green-500",
      text: "text-pink-500",
      textSecondary: "text-green-500",
    },
    {
      primary: "bg-blue-500",
      secondary: "bg-yellow-400",
      text: "text-blue-500",
      textSecondary: "text-yellow-500",
    },
    {
      primary: "bg-purple-500",
      secondary: "bg-orange-400",
      text: "text-purple-500",
      textSecondary: "text-orange-500",
    },
    {
      primary: "bg-red-500",
      secondary: "bg-cyan-400",
      text: "text-red-500",
      textSecondary: "text-cyan-500",
    },
    {
      primary: "bg-indigo-500",
      secondary: "bg-lime-400",
      text: "text-indigo-500",
      textSecondary: "text-lime-500",
    },
    {
      primary: "bg-fuchsia-500",
      secondary: "bg-teal-400",
      text: "text-fuchsia-500",
      textSecondary: "text-teal-500",
    },
  ];
  return pairs[Math.floor(Math.random() * pairs.length)];
};
