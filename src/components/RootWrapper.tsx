import { useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
import Loader from "monday-ui-react-core/dist/Loader";
import StoryDescription from "monday-ui-react-core/dist/StoryDescription";
import QuestionBubble from "./QuestionBubble";
import ResponceTyping from "./ResponceTyping";
import ResponceBubble from "./ResponceBubble";

export default function RootWrapper({onChat}: {onChat: Function}) {

    const [searchText, setSeachText] = useState('')

    

    return (
        <div>
            {/* Awaiting board Read */}
            {/* <StoryDescription description="L" vertical align={Flex.align.MEDIUM}>
                <div className="monday-storybook-loader_size-variants_container">
                    <Loader size={Loader.sizes.LARGE} />
                </div>
            </StoryDescription> */}

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
