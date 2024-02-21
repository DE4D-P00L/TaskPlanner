const tailwindColors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-blue-500",
  "bg-green-500",
  "bg-green-300",
  "bg-yellow-500",
  "bg-yellow-300",
  "bg-purple-500",
  "bg-purple-300",
  "bg-indigo-500",
  "bg-indigo-300",
  "bg-pink-500",
  "bg-pink-300",
  "bg-orange-500",
  "bg-orange-400",
];

export default function randomRGBColor() {
  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  return tailwindColors[randomIndex];
}
