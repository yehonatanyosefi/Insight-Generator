// @ts-ignore
import Box from "monday-ui-react-core/dist/Box";

export default function ResponseBubble({text} : {text: string}) {
    return (
        <div className="answer-container">
            {/* <img src="https://cdn.vectorstock.com/i/1000x1000/87/25/robot-electric-avatar-icon-vector-10068725.webp" title="assistant-avatar"/> */}

            <Box className="answer text-black" // Not Monday Background Colors
                border={Box.borders.DEFAULT} 
                rounded={Box.roundeds.MEDIUM}>
                    
                <pre className="re-1 pl-2 answer-text">
                {/* In pre tag Enter is not visible, also pre tag is not returns the new tag. Need to create processor that will replace enter character on <br/>*/}
                <b>Board Assistant:</b> {text}
                </pre>
            </Box>
                    </div>
    );
}
