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

// Lets make sumn to format the files into good-to-work-with files
export interface DeFile {
    name: string,
    url: string,
    type: string
}

export interface OrgFile {
    images: DeFile[],
    audios: DeFile[],
    videos: DeFile[],
    other: DeFile[]
}


const image = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico']
const audio = ['mp3', 'm4a', 'wav', 'aac', 'ogg', 'flac']
const video = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv']
export const FileType = {
    AUDIO: 'audio',
    VIDEO: 'video',
    IMAGE: 'image',
    OTHER: 'other'
} as const;

export function formatFiles(urls: string[]): DeFile[] {
    let file: DeFile = {name: "", url: "", type: ""}
    let files: DeFile[] = []
    for (let i = 0; i < urls.length; i++) {
        file.name = urls[i].split('.com/')[1].split('/')[1].split('.')[0]
        file.url = urls[i]
        if (image.includes(urls[i].split('.com/')[1].split('/')[1].split('.')[1])) {
            file.type = FileType.IMAGE
        } else if (audio.includes(urls[i].split('.com/')[1].split('/')[1].split('.')[1])) {
            file.type = FileType.AUDIO
        } else if (video.includes(urls[i].split('.com/')[1].split('/')[1].split('.')[1])) {
            file.type = FileType.VIDEO
        } else {
            file.type = FileType.OTHER
        }

        files.push(file)
        file = {name: "", url: "", type: ""}
    }
    return files
}


// to test this shi
const urls = ['https://aws.remshare.com/sharing/17748396391671781257328642RemshareDevman.jpg', 'https://aws.remshare.com/sharing/TheOneRemshareDevman.mp3']

console.log("Formatted files: ", formatFiles(urls))

// rtime we organize ts
export function organizeFiles(files: DeFile[]): OrgFile {
    let org: OrgFile = {images: [], audios: [], videos: [], other: []}

    for (let i = 0; i < files.length; i++) {
        if (files[i].type === FileType.IMAGE) {
            org.images.push(files[i])
        } else if (files[i].type === FileType.VIDEO) {
            org.videos.push(files[i])
        } else if (files[i].type === FileType.AUDIO) {
            org.audios.push(files[i])
        } else if (files[i].type === FileType.OTHER) {
            org.other.push(files[i])
        } else {
            console.log("File has no type: ", files[i])
        }
    }

    return org
}

console.log("Organised files: ", organizeFiles(formatFiles(urls)))
