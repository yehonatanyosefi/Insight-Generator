import React, { useEffect, useState } from "react";
import Box from "monday-ui-react-core/dist/Box";

export default function ResponceTyping() {
    const [dots, setDots] = useState("...");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length === 3) {
                    return ".";
                } else if (prevDots.length === 1) {
                    return "..";
                } else {
                    return "...";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="m-2 w-7">
            <Box
                className="bg-slate-200 text-black" // Not Monday Background Colors
                border={Box.borders.DEFAULT}
                rounded={Box.roundeds.MEDIUM}
            >
                <p className="p-1 pl-2">{dots}</p>
            </Box>
        </div>
    );
}
