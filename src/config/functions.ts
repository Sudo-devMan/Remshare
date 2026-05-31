import api from "./api";
import type { ReceiveFile, ShareFile } from "./types";

export async function sendFile(file: ShareFile) {
    try {
        const response = await api.post('sharing/share/', file);
        if (response.status === 201 || response.status === 200)
            return response
    } catch (err: any) {
        return {
            error: err.message
        }
    }
}

export async function receiveFile(file: ReceiveFile) {
    try {
        const response = await api.post('shraring/receive/', file)
        if (response.status === 201 || response.status === 200) {
            return response
        }
    } catch (err: any) {
        return {
            error: err.message
        }
    }
}
