import { Users, MessageCircle } from "lucide-react";



function Header() {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ChatRoom</h1>
            <p className="text-sm text-gray-400">Stay connected</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Users className="w-5 h-5" />
          <span className="text-sm">Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;