import React from "react";
// import { TextField } from "monday-ui-react-core"; // Doesnt work at all, deconstruction will result in ReferenceError: global is not defined
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";

export default function RootWrapper() {
    return (
        <div>
            {/* Top chat items */}
            


            {/* Bottom chat send items */}
            <div className="flex m-3 space-x-4 fixed bottom-0 inset-x-0">
                <TextField className="w-3/4"
                    placeholder="Validate me"
                    size={TextField.sizes.MEDIUM}
                />
                <Button>Chat </Button>
            </div>
        </div>
    );
}
