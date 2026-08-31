
export type ShareFile = {
    password: string,
    files: any,
    note: string,
    uniqueId?: string,
    receiveUrl?: string
}

export type ReceiveFile = {
    password: string,
    uniqueId: string
}

export type ReceiveData = {
    password: string,
    uniqueId: string
}
