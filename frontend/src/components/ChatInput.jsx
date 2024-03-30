import { sendMsg } from "../api";


const ChatInput = () => {
  return (
    <div className="w-24 block m-auto">
      <input
  className="p-3 m-0 text-xl border-none border rounded-md border-gray-200 w-max shadow-md shadow-gray-400"
  placeholder="Type a message... Hit Enter to send"
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      sendMsg(e.target.value);
    }
  }}
/>
    </div>
  )
}

export default ChatInput