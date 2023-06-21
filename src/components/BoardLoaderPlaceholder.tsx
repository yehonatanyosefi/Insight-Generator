import  { useEffect, useState } from "react";
import Loader from "monday-ui-react-core/dist/Loader";

export default function BoardLoaderPlaceholder() {
    const [isLoading, setIsLoading] = useState(true);

    // Makes so that text "If your board is big it might take some time" appears some time after loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>  
            {/* Awaiting board Read */}
            {/* <div className="grid h-screen place-items-center"> */}
            <div className="absolute inset-0 flex items-center justify-center mb-8">
                <div className="monday-storybook-loader_size-variants_container flex flex-col items-center">
                    <p className="mb-3 text-lg">Fetching your board...</p>
                    <Loader size={Loader.sizes.MEDIUM} />
                </div>

            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                {!isLoading && <p className="text-gray-400 text-sm mt-48">If your board is big it might take some time</p>}
            </div>
        </>);
}
