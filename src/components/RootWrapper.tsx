import { useEffect, useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
// import Loader from "monday-ui-react-core/dist/Loader";
// import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
// import ResponseTyping from "./ResponseTyping";
import ResponseBubble from "./ResponseBubble";
// import BoardLoaderPlaceholder from "./BoardLoaderPlaceholder";
import { v4 as uuid } from "uuid";

export default function RootWrapper({
  onChat,
}: {
  onChat: (arg0: string, arg1: ChatHistory[]) => Promise<string>;
}) {
  const [searchText, setSearchText] = useState("");
  const [isLoadingAIAnswer, setIsLoadingAIAnswer] = useState<boolean>(false);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  console.log(
    "file: RootWrapper.tsx:18 -> RootWrapper -> chatHistory:",
    chatHistory
  );

  const handlePromptSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldSearchText = searchText;
    setChatHistory((prev) => [...prev, { Human: oldSearchText }]);
    setSearchText("");
  };

  useEffect(() => {
    chatHistory.length &&
      Object.keys(chatHistory[chatHistory.length - 1])[0] === "Human" &&
      onSetChat(searchText);
  }, [chatHistory]);

  const onSetChat = async (searchText: string) => {
    setIsLoadingAIAnswer(true);
    const answer: string = await onChat(searchText, chatHistory);

    setChatHistory((prev) => [...prev, { AI: answer }]);
    setIsLoadingAIAnswer(false);
  };

  return (
    <div>
      <section className="overflow-y-scroll chat-section">
        <div className="flex justify-end" key={uuid()}>
          <QuestionBubble
            text={`Hi x 👋, I am your Board Assistant. Feel free to ask me anything related to the board. `}
            key={uuid()}
          />
        </div>
        {chatHistory.map((msg) => {
          if (msg.Human) {
            return (
              <div className="flex justify-end" key={uuid()}>
                <QuestionBubble text={msg.Human as string} key={uuid()} />
              </div>
            );
          } else {
            return (
              <div className="flex justify-start" key={uuid()}>
                <ResponseBubble text={msg.AI as string} key={uuid()} />
              </div>
            );
          }
        })}
        {chatHistory.length === 1 && (
          <div className="pre-actions">
            <Button size={Button.sizes.SMALL} kind={Button.kinds.SECONDARY}>
              Show board analytics
            </Button>
            <Button size={Button.sizes.SMALL} kind={Button.kinds.SECONDARY}>
              Give Insights
            </Button>
          </div>
        )}

        {/* Bottom chat send items */}
      </section>
      <section className="fixed bottom-0 inset-x-0 chat-container">
        {/* {!isLoadingAIAnswer && (
          <div className="ai-typing-container">
            <p className="text-gray-400 text-sm mt-48">
              Board Assistant is typing...
            </p>
          </div>
        )} */}
        <form className="flex m-3 space-x-4" onSubmit={handlePromptSend}>
          <TextField
            className="w-3/4"
            placeholder="Send a message"
            size={TextField.sizes.MEDIUM}
            onChange={(e: string) => setSearchText(e)}
            value={searchText}
          />
          <Button type="submit">Chat</Button>
        </form>
      </section>
    </div>
  );
}
