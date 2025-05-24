import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { TbMessageDots } from 'react-icons/tb';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const GEMINI_API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;

    async function getGeminiReply(userMessage) {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            }
        );
        const data = await response.json();
        return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't understand that."
        );
    }

    return (
        <div className='flex gap-5 bg-purple-500 border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu)
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

            {/* Chatbot Icon */}
            <button
                className='text-black ml-auto'
                onClick={() => setOpenChat(true)}
                aria-label="Open Chatbot"
            >
                <TbMessageDots className="text-2xl" />
            </button>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}

            {/* Chatbot Dialog */}
            {openChat && (
                <div className="fixed inset-0 bg-opacity-30 flex flex-col items-end z-50">
                    <div
                        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mt-10 mr-10 relative animate-slideDown"
                        style={{ transition: 'transform 0.3s', transform: 'translateY(0)' }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setOpenChat(false)}
                            aria-label="Close Chatbot"
                        >
                            <HiOutlineX className="text-2xl" />
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-purple-700 flex items-center gap-2">
                            <TbMessageDots className="text-2xl" /> Chatbot
                        </h3>
                        <div className="h-100 border rounded-lg mb-4 p-3 overflow-y-auto bg-purple-50 flex flex-col gap-2" id="chat-scroll">
                            {messages.length === 0 ? (
                                <p className="text-gray-400 text-center mt-10">Start a conversation...</p>
                            ) : (
                                messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.sender === "chatbot" && (
                                            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold">
                                                <TbMessageDots />
                                            </div>
                                        )}
                                        <div
                                            className={`px-4 py-2 rounded-2xl shadow max-w-[70%] break-words text-sm ${msg.sender === "user"
                                                ? "bg-purple-500 text-white"
                                                : "bg-white text-black border"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        {msg.sender === "user" && (
                                            <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold">
                                                <span>U</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        <form
                            className="flex gap-2"
                            onSubmit={async e => {
                                e.preventDefault();
                                if (input.trim()) {
                                    setMessages([...messages, { text: input, sender: "user" }]);
                                    setInput("");
                                    setTimeout(() => {
                                        document.getElementById("chat-scroll").scrollTop = document.getElementById("chat-scroll").scrollHeight;
                                    }, 100);
                                    setMessages(msgs => [...msgs, { text: "Typing...", sender: "chatbot" }]);
                                    const botReply = await getGeminiReply(input);
                                    setMessages(msgs => [
                                        ...msgs.slice(0, -1),
                                        { text: botReply, sender: "chatbot" }
                                    ]);
                                    setTimeout(() => {
                                        document.getElementById("chat-scroll").scrollTop = document.getElementById("chat-scroll").scrollHeight;
                                    }, 100);
                                }
                            }}
                        >
                            <input
                                type="text"
                                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Type your message..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-semibold transition"
                                disabled={!input.trim()}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;
