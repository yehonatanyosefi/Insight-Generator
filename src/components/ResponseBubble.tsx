import React from "react";
import Box from "monday-ui-react-core/dist/Box";

export default function ResponseBubble({text} : {text: string}) {
    return (
        <div className="mr-10 m-2">
            <Box className="bg-slate-200 text-black" // Not Monday Background Colors
                border={Box.borders.DEFAULT} 
                rounded={Box.roundeds.MEDIUM}>
                    
                <p className="p-1 pl-2">
                {/* In pre tag Enter is not visible, also pre tag is not returns the new tag. Need to create processor that will replace enter character on <br/>*/}
                        {text}
                </p>
            </Box>
        </div>
    );
}
