"use client"
function ChatInbox() {
    return (
      <div className="max-w-sm w-full h-[300px] bg-white shadow-lg rounded-lg p-4 flex flex-col">
        {/* Messages List (empty for now) */}
        <div className="flex-grow overflow-y-auto mb-4 bg-gray-100 rounded-lg p-2">
          {/* Messages will be displayed here */}
        </div>
  
        {/* Input Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none">
            Send
          </button>
        </div>
      </div>
    );
  }
  
  export default ChatInbox;
  