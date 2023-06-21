import React from "react";
import Box from "monday-ui-react-core/dist/Box";

export default function ResponseBubble({text} : {text: string}) {
    console.log("file: ResponseBubble.tsx: ResponseBubble: text", text)
    return (
            <Box className="answer text-black" // Not Monday Background Colors
                border={Box.borders.DEFAULT} 
                rounded={Box.roundeds.MEDIUM}>
                    
                <pre className="re-1 pl-2 answer-text">
                {/* In pre tag Enter is not visible, also pre tag is not returns the new tag. Need to create processor that will replace enter character on <br/>*/}
                <b>Board Assistant:</b> {text}
                </pre>
            </Box>
    );
}
