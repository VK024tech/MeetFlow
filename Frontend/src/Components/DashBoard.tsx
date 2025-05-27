
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import DashHeader from "./DashHeader";
import SharedFiles from "./SharedFiles";


import { useChatContext } from "../context/Chat";
import ShareError from "./ShareError";

function DashBoard() {
  const { shareError } = useChatContext();
  return (
    <div className="flex h-screen w-screen ">
      {shareError && <ShareError />}
      <Contacts />
      <div className="w-full max-w-6xl">
        <DashHeader />
        <ChatBox />
      </div>
      <SharedFiles />
    </div>
  );
}

export default DashBoard;
