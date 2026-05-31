import { createContext, useContext, useState, type ReactNode } from "react";
import type { ShareFile } from "./config/types";

interface ShareFilesDataContextType {
    shareData: ShareFile,
    setShareData: React.Dispatch<React.SetStateAction<ShareFile>>
}

const ShareContext = createContext<ShareFilesDataContextType | undefined>(undefined)

export const ShareProvider = ({children}: {children: ReactNode}) => {
    const [shareData, setShareData] = useState<ShareFile>({
        receiverEmail: "",
        senderEmail: "",
        password: "",
        note: "",
        files: [],
        uniqueId: ""
    })

    return (
        <ShareContext.Provider value={{shareData, setShareData}}>
            {children}
        </ShareContext.Provider>
    )
}

export const useShare = () => {
    const context = useContext(ShareContext);
    if (!context) {
        throw new Error("useShare must be used within ShareProvider")
    }
    return context;
}


