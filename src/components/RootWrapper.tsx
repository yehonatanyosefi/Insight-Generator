import { useEffect, useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
import Loader from "monday-ui-react-core/dist/Loader";
import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
import ResponseTyping from "./ResponseTyping";
import ResponseBubble from "./ResponseBubble";
import BoardLoaderPlaceholder from "./BoardLoaderPlaceholder";
import { v4 as uid } from 'uuid';

export default function RootWrapper({ onChat }: { onChat: Function }) {
    const [searchText, setSearchText] = useState("");
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const handlePromptSend = async (e: any) => {
        e.preventDefault();
        const oldSearchText = searchText;
        setChatHistory((prev) => [...prev, { Human: oldSearchText }]);
        setSearchText("");
        // const res = await onChat(oldSearchText);
        // setChatHistory((prev) => [...prev, { AI: res }]);
    };

    return (
        <div>
            {/* This component should be shown when the board is fetching. only this component and nothing else */}
            {/* <BoardLoaderPlaceholder/> */}

            {/* Top chat items */}
            <div className="overflow-y-scroll h-72 no-scrollbar">
                {chatHistory.map((item: any) => {
                    console.log(item.Human, item.AI)
                    if (item.Human) {
                        return (
                            <div className="flex justify-end" key={uid()}>
                                <QuestionBubble text={item.Human.text as any} key={uid()}/>
                            </div>
                        );
                    } else {
                        return (
                            <div className="flex justify-start" key={uid()}>
                                <ResponseBubble text={item.AI.text as any} key={uid()}/>
                            </div>
                        );
                    }
                })}
            </div>

            {/* Bottom chat send items */}
            <div className="fixed bottom-0 inset-x-0">
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
            </div>
        </div>
    );
}
