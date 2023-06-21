import { useEffect, useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
import Loader from "monday-ui-react-core/dist/Loader";
import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
import ResponceTyping from "./ResponceTyping";
import ResponceBubble from "./ResponceBubble";
import BoardLoaderPlaceholder from "./BoardLoaderPlaceholder";

export default function RootWrapper({ onChat }: { onChat: Function }) {
    const [searchText, setSeachText] = useState("");

    return (
        <div>
            
            {/* This component should be shown when the board is fetching. only this component and nothing else */}
            {/* <BoardLoaderPlaceholder/> */}

            {/* Top chat items */}
            <div className="overflow-y-scroll h-72 no-scrollbar">
                <QuestionBubble />
                <ResponceTyping />
                <ResponceBubble />
                <QuestionBubble />
                <ResponceTyping />
                <ResponceBubble />
                <QuestionBubble />
                <ResponceTyping />
                <ResponceBubble />
                <QuestionBubble />
                <ResponceTyping />
                <ResponceBubble />
                <QuestionBubble />
                <ResponceTyping />
                <ResponceBubble />
                <QuestionBubble />
                <ResponceTyping />
                <ResponceBubble />
            </div>

            {/* Bottom chat send items */}
            <div className="flex m-3 space-x-4 fixed bottom-0 inset-x-0">
                <TextField
                    className="w-3/4"
                    placeholder="Send a message"
                    size={TextField.sizes.MEDIUM}
                    onChange={(e: string) => setSeachText(e)}
                    value={searchText}
                />
                <Button onClick={() => onChat(searchText)}>Chat </Button>
            </div>
        </div>
    );
}
