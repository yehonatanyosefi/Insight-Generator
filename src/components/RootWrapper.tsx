import { useEffect, useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
import SplitButton from "monday-ui-react-core/dist/SplitButton";
import Menu from "monday-ui-react-core/dist/Menu";
import MenuItem from "monday-ui-react-core/dist/MenuItem";
// import Loader from "monday-ui-react-core/dist/Loader";
// import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
// import ResponseTyping from "./ResponseTyping";
import ResponseBubble from "./ResponseBubble";
// import BoardLoaderPlaceholder from "./BoardLoaderPlaceholder";
import { v4 as uuid } from "uuid";
import ResponseTyping from "./ResponseTyping";
import Activity from "monday-ui-react-core/dist/icons/Activity";
import Board from "monday-ui-react-core/dist/icons/Board";
// import { Menu, MenuItem, SplitButton } from "monday-ui-react-core";
export default function RootWrapper({
  onChat,
  onChooseOption,
  userName,
  conversationType,
}: {
  onChat: (arg0: string, arg1: ChatHistory[]) => Promise<string>;
  onChooseOption: Function;
  userName: string | null;
  conversationType: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [isLoadingAIAnswer, setIsLoadingAIAnswer] = useState<boolean>(false);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  const handlePromptSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldSearchText = searchText;
    setChatHistory((prev) => [...prev, { Human: oldSearchText }]);
  };

  useEffect(() => {
    chatHistory.length &&
      Object.keys(chatHistory[chatHistory.length - 1])[0] === "Human" &&
      onSetChat(searchText);
        setSearchText("");

  }, [chatHistory]);

  const onSetChat = async (searchText: string) => {
    console.log("file: RootWrapper.tsx:48 -> onSetChat -> searchText:", searchText)
    setIsLoadingAIAnswer(true);
    const answer: string = await onChat(searchText, chatHistory);

    setChatHistory((prev) => [...prev, { AI: answer }]);
    setIsLoadingAIAnswer(false);
  };

  const AssistantOptionsMenu = () => {
    return (
      <Menu size="small">
        <MenuItem
          onClick={() => onChooseOption('activity',setSearchText, setChatHistory)}
          iconType="SVG"
        //   iconBackgroundColor="var(--color-indigo)"
          icon={Activity}
          title="Activity Logs"
        />
        <MenuItem
          onClick={() => onChooseOption('board',setSearchText, setChatHistory)}
          iconType="SVG"
        //   iconBackgroundColor="var(--color-stuck-red)"
          icon={Board}
          title="Board Information"
        />
        {/* <MenuItem
      onClick={() => getHTMLFromBodyMessage(asyncResult => forwardEmail(asyncResult, type))}
      icon={Send}
      title="Forward mail as update"
      tooltipContent="Automatically send the body of the current message to an update"
      tooltipPosition="bottom"
    /> */}
      </Menu>
    );
  };

  return (
    <div>
      <section className="overflow-y-scroll chat-section">
        <div className="flex justify-start" key={uuid()}>
          <ResponseBubble
            text={`Hi ${userName} 👋, I am your Board Assistant. Feel free to ask me anything related to the board. `}
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
        {isLoadingAIAnswer && <ResponseTyping />}
        {!chatHistory.length && (
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
        <form className="flex m-3 space-x-4" onSubmit={handlePromptSend}>
          <TextField
            className="w-3/4"
            placeholder={`Ask for assistance about ${conversationType}..`}
            size={TextField.sizes.MEDIUM}
            onChange={(e: string) => setSearchText(e)}
            value={searchText}
          />
          <SplitButton
            loading={isLoadingAIAnswer}
            // disabled={!searchText}
            type="button"
            onClick={handlePromptSend}
            secondaryDialogContent={<AssistantOptionsMenu />}
            shouldCloseOnClickInsideDialog
          >
            Chat
          </SplitButton>
        </form>
      </section>
    </div>
  );
}
