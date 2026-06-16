
// Lets make sumn to format the files into good-to-work-with files
export interface DeFile {
    name: string,
    url: string,
    type: string
}

const image = ['png', 'jpg']
const audio = ['mp3', 'm4a']
const video = ['mp4']
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
        file = { name: "", url: "", type: "" };
    }
    return files
}

// to test this shi
// const urls = ['https://aws.remshare.com/sharing/17748396391671781257328642RemshareDevman.jpg', 'https://aws.remshare.com/sharing/TheOneRemshareDevman.mp3']

// console.log(formatFiles(urls))