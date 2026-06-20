
export type ShareFile = {
    receiverEmail: string,
    senderEmail: string,
    password: string,
    files: any,
    note: string,
    uniqueId?: string,
    receiveUrl?: string
}

export type ReceiveFile = {
    password: string,
    receiverEmail: string,
    uniqueId: string
}

export type ReceiveData = {
    receiverEmail: string,
    password: string,
    uniqueId: string
}
