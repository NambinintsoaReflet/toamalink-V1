export default function MessageItem({ msg, userId }) {
  const isMine = msg.sender_id === userId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded max-w-xs ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      > {msg.message}</div>
    </div>
  );
}
