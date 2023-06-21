import { useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";

export default function RootWrapper({onChat}: {onChat: Function}) {

    const [searchText, setSeachText] = useState('')

    

    return (
        <div>
            {/* Top chat items */}
            


            {/* Bottom chat send items */}
            <div className="flex m-3 space-x-4 fixed bottom-0 inset-x-0">
                <TextField
                    placeholder="Artem bot"
                    size={TextField.sizes.MEDIUM}
                    onChange={(e: string) => setSeachText(e)}
                    value={searchText}
                />
                <Button onClick={() => onChat(searchText)}>Chat </Button>
            </div>
        </div>
    );
}
