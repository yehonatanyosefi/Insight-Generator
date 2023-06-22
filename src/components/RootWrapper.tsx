import { useState } from "react";

// import Loader from "monday-ui-react-core/dist/Loader";
// import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
// import ResponseTyping from "./ResponseTyping";
import ResponseBubble from "./ResponseBubble";
// import BoardLoaderPlaceholder from "./BoardLoaderPlaceholder";
import { v4 as uuid } from "uuid";
import ResponseTyping from "./ResponseTyping";
// @ts-ignore
import Activity from "monday-ui-react-core/dist/icons/Activity";
// @ts-ignore
import Board from "monday-ui-react-core/dist/icons/Board";
// @ts-ignore
import TextField from "monday-ui-react-core/dist/TextField";
// @ts-ignore
import Button from "monday-ui-react-core/dist/Button";
// @ts-ignore
import SplitButton from "monday-ui-react-core/dist/SplitButton";
// @ts-ignore
import Menu from "monday-ui-react-core/dist/Menu";
// @ts-ignore
import MenuItem from "monday-ui-react-core/dist/MenuItem";
// @ts-ignore
import Update from "monday-ui-react-core/dist/icons/Update";
// @ts-ignore
import Robot from "monday-ui-react-core/dist/icons/Robot";
// import { Menu, MenuItem, SplitButton } from "monday-ui-react-core";
export default function RootWrapper({
  onChat,
  onChooseOption,
  userData,
  conversationType,
}: {
  onChat: (arg0: string, arg1: ChatHistory[]) => Promise<string>;
  onChooseOption: Function;
  userData: any;
  conversationType: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [isLoadingAIAnswer, setIsLoadingAIAnswer] = useState<boolean>(false);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  const handlePromptSend = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("here :D");
    e.preventDefault();
    const oldSearchText = searchText;
    setChatHistory((prev) => {
      const newHistory = [...prev, { Human: oldSearchText }];
      onSetChat(oldSearchText, newHistory);
      setSearchText("");
      return newHistory;
    });
  };

  const handleSuggestionPrompt = (
    searchText: string,
    preparedPrompt: string
  ) => {
    const oldSearchText = searchText;
    setChatHistory((prev) => {
      const newHistory = [...prev, { Human: oldSearchText }];
      onSetChat(preparedPrompt, newHistory);
      setSearchText("");
      return newHistory;
    });
  };

  const onSetChat = async (searchText: string, newHistory: ChatHistory[]) => {
    if (isLoadingAIAnswer) return;
    setIsLoadingAIAnswer(true);
    const answer: string = await onChat(searchText, newHistory);

    setChatHistory((prev) => [...prev, { AI: answer }]);
    setIsLoadingAIAnswer(false);
  };

  const getBoardUseCase = (conversationType: string) => {
    switch (conversationType) {
      case "activity":
        return "activities";
      case "board":
        return "data";
      case "agent":
        return "data";
      case "updates":
        return "updates";

      default:
        break;
    }
  };

  const AssistantOptionsMenu = () => {
    let menuItemsToDisplay = null;

    switch (conversationType) {
      case "activity":
        menuItemsToDisplay = (
          <Menu size="small">
            <MenuItem
              onClick={() =>
                onChooseOption("board", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Board}
              title="Board Information"
            />
            <MenuItem
              onClick={() =>
                onChooseOption("updates", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Update}
             title="Board Updates"
            />
                        <MenuItem
              onClick={() =>
                onChooseOption("agent", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Robot}
              title="Agent (experimental)"
            />
          </Menu>
        );
        break;
      case "board":
        menuItemsToDisplay = (
          <Menu size="small">
            <MenuItem
              onClick={() =>
                onChooseOption("activity", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Activity}
              title="Board Activities"
            />
            <MenuItem
              onClick={() =>
                onChooseOption("updates", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Update}
              title="Board Updates"
            />
            <MenuItem
              onClick={() =>
                onChooseOption("agent", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Robot}
              title="Agent (experimental)"
            />
          </Menu>
        );
        break;
      case "updates":
        menuItemsToDisplay = (
          <Menu size="small">
            <MenuItem
              onClick={() =>
                onChooseOption("board", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Board}
              title="Board Information"
            />
            <MenuItem
              onClick={() =>
                onChooseOption("activity", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Activity}
              title="Board Activities"
            />
                        <MenuItem
              onClick={() =>
                onChooseOption("agent", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Robot}
              title="Agent (experimental)"
            />
          </Menu>
        );
        break;
      case "agent":
        menuItemsToDisplay = (
          <Menu size="small">
            <MenuItem
              onClick={() =>
                onChooseOption("board", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Board}
              title="Board Information"
            />
            <MenuItem
              onClick={() =>
                onChooseOption("activity", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Activity}
              title="Board Activities"
            />
            <MenuItem
              onClick={() =>
                onChooseOption("updates", setSearchText, setChatHistory)
              }
              iconType="SVG"
              icon={Update}
              title="Board Updates"
            />
          </Menu>
        );
        break;
    }

    return menuItemsToDisplay;
  };

  return (
    <div>
      <section className="overflow-y-scroll chat-section">
        <div className="flex justify-start" key={uuid()}>
          <ResponseBubble
            text={`Hi ${
              userData.userName
            } 👋, I am your Board Assistant. Feel free to ask me anything related to the board ${getBoardUseCase(
              conversationType
            )}. `}
            key={uuid()}
          />
        </div>
        {chatHistory.map((msg) => {
          if (msg.Human) {
            return (
              <div className="flex justify-end" key={uuid()}>
                <QuestionBubble
                  userData={userData}
                  text={msg.Human as string}
                  key={uuid()}
                />
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
        {!chatHistory.length && conversationType === "board" && (
          <div className="pre-actions">
            <Button
              size={Button.sizes.SMALL}
              onClick={() =>
                handleSuggestionPrompt(
                  "What are the best insights I can get from the board?",
                  "Looking at the 'title' column, are there similar tasks that can be grouped together for efficiency? What are they? What are the best insights I can get from the board?"
                )
              }
              kind={Button.kinds.SECONDARY}
            >
              Get Insights
            </Button>
            <Button
              onClick={() =>
                handleSuggestionPrompt(
                  "What are some potential bottlenecks in our current workflow?",
                  "What are some potential bottlenecks in our current workflow?"
                )
              }
              size={Button.sizes.SMALL}
              kind={Button.kinds.SECONDARY}
            >
              Identify Bottlenecks
            </Button>
          </div>
        )}

        {/* Bottom chat send items */}
      </section>
      <section className="fixed bottom-0 inset-x-0 chat-container">
        <form className="flex m-3 space-x-4" onSubmit={handlePromptSend}>
          <TextField
            className="w-3/4"
            placeholder={`Ask for assistance about the board ${getBoardUseCase(conversationType)}..`}
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
