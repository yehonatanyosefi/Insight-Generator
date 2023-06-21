import { useEffect, useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
// import Loader from "monday-ui-react-core/dist/Loader";
// import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
// import ResponseTyping from "./ResponseTyping";
import ResponseBubble from "./ResponseBubble";
// import BoardLoaderPlaceholder from "./BoardLoaderPlaceholder";
import { v4 as uuid } from 'uuid';

export default function RootWrapper({ onChat }: { onChat: (arg0: string, arg1: ChatHistory[]) => Promise<string> }) {
    const [searchText, setSearchText] = useState("");



    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);


    const handlePromptSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const oldSearchText = searchText;
        setChatHistory((prev) => [...prev, { Human: oldSearchText }]);
        setSearchText("");
    };

    useEffect(() => {
        (chatHistory.length && Object.keys(chatHistory[chatHistory.length - 1])[0] === "Human") && onSetChat(searchText)
    }, [chatHistory])


    const onSetChat = async(searchText: string) => {
        const answer: string = await onChat(searchText, chatHistory);
        setChatHistory((prev) => [...prev, { AI: answer }]);
    }

    return (
        <div>
            <section className="overflow-y-scroll chat-section">
                {chatHistory.map((msg) => {
                    if (msg.Human) {
                        return (
                            <div className="flex justify-end" key={uuid()}>
                                <QuestionBubble text={msg.Human as string} key={uuid()}/>
                            </div>
                        )
                    } else {
                        return (
                            <div className="flex justify-start" key={uuid()}>
                                <ResponseBubble text={msg.AI as string} key={uuid()}/>
                            </div>
                        );
                    }
                })}
            </section>

            {/* Bottom chat send items */}
            <section className="fixed bottom-0 inset-x-0">
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
