import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { ReceiveData, ShareFile } from "./config/types";

interface ShareFilesDataContextType {
    shareData: ShareFile,
    setShareData: React.Dispatch<React.SetStateAction<ShareFile>>
}

interface ReceiveFilesFormData {
    receiveData: ReceiveData,
    setReceiveData: React.Dispatch<React.SetStateAction<ReceiveData>>
}

const ShareContext = createContext<ShareFilesDataContextType | undefined>(undefined)
const ReceiveContext = createContext<ReceiveFilesFormData | undefined>(undefined)

export const ShareProvider = ({children}: {children: ReactNode}) => {
    const [shareData, setShareData] = useState<ShareFile>({
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

export const ReceiveProvider = ({children}: {children: ReactNode}) => {
    const [receiveData, setReceiveData] = useState<ReceiveData>({
        password: "",
        uniqueId: ""
    })

    return (
        <ReceiveContext.Provider value={{receiveData, setReceiveData}}>
            {children}
        </ReceiveContext.Provider>
    )
}

export const useReceive = () => {
    const c = useContext(ReceiveContext)
    if (!c) {
        throw new Error("useReceive must be used within ReceiveProvider")
    }

    return c;
}

export const useShare = () => {
    const context = useContext(ShareContext);
    if (!context) {
        throw new Error("useShare must be used within ShareProvider")
    }
    return context;
}


