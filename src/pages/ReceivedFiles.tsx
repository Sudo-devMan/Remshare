
import { faBookOpenReader, faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useShare } from "../context";
import { FileType, formatFiles, organizeFiles } from "../config/functions";
import type { OrgFile } from "../config/functions";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE_FILES } from "../config/constants";
const filesHead = "caveat text-blue-700 font-bold text-3xl my-3"

// interface SharingResponse {
//     id: number;
//     note?: string;
//     receiverEmail: string;
//     senderEmail: string;
//     uniqueId: string;
//     files: string[];
// }

function ReceivedFiles() {

    const [files, setFiles] = useState<OrgFile>();
    const {shareData} = useShare()
    const [downloading, setDownloading] = useState(false)
    const [oneD, setOneD] = useState<{b: boolean, url: string}>({b: false, url: ''})
    let isFiles = shareData.files.length < 0

    // console.log("Received Files: ", shareData)
    


    const getFileName = (fileUrl: string): string => {
        if (!fileUrl) return "Unknown_File";
        return fileUrl.split('/').pop()?.split('\\').pop() || "download";
    };

    useEffect(() => {
        setFiles(organizeFiles(formatFiles(shareData.files)))
        localStorage.clear()
        localStorage.setItem(LOCAL_STORAGE_FILES, JSON.stringify(organizeFiles(formatFiles(shareData.files))))
    }, [])

    const triggerDownload = async (fileUrl: string) => {
        // console.log("triggerDownload: ", fileUrl)
        setOneD({b: true, url: fileUrl})
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error('Network response error');
            
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = getFileName(fileUrl);
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Failed to force download, falling back to open window.", error);
            window.open(fileUrl, '_blank');
        } finally {
            setOneD({b: false, url: ''})
        }
    };

    const handleDownloadAll = async () => {
        setDownloading(true);
        try {
            const downloadPromises = shareData.files.map((fileUrl: string) => {
                if (fileUrl) {
                    return triggerDownload(fileUrl);
                }
                return Promise.resolve(); 
            });

            await Promise.all(downloadPromises);
        } catch (error) {
            console.error("One or more downloads failed", error);
        } finally {
            setDownloading(false);
        }
    };
  return (
    <div className='w-full p-1'>
      <h1 className="text-center bangers-font text-7xl my-3">Received Files</h1>
      <div className="sm:grid sm:grid-cols-2 px-5 items-start gap-4">
        <div className="border border-2 rounded-lg w-full sm:w-2/3 p-3 sm:m-0 mb-2">
            <p className='caveat text-xl sm:text-2xl'><span className="text-blue-700 font-bold">From: </span>{shareData.senderEmail}</p>
            <br /><p className='caveat text-xl sm:text-2xl'><span className="text-blue-700 font-bold">To: </span>{shareData.receiverEmail}</p>
            <br /><p className='caveat text-xl sm:text-2xl'><span className="text-blue-700 font-bold">Unique ID: </span>{shareData.uniqueId}</p>
            <br /><p className='caveat text-xl sm:text-2xl'><span className="text-blue-700 font-bold">Note: </span>{shareData.note ? shareData.note : "NO NOTE PROVIDED"}</p>
            {
                downloading ?
                    <button disabled className="text-2xl w-full p-3 cursor-pointer transform duration-300 text-3xl bg-green-600 border-2 rounded-4xl mt-3 text-white caveat border border-black">
                        Downloading... <FontAwesomeIcon icon={faDownload} />
                    </button>
                    :
                    <button onClick={() => handleDownloadAll()} className="w-full p-3 cursor-pointer hover:bg-green-500 transform duration-300 text-3xl bg-green-600 border-2 rounded-4xl active:bg-green-700 mt-3 text-white caveat border border-black">
                        Download all <FontAwesomeIcon icon={faDownload} />
                    </button>
            }
            <br /><br />
            <Link to={'/'} className="caveat bg-white p-2 rounded-3xl text-xl border border-black">
                Back to home
            </Link>
        </div>
        
        <div className="border border-2 rounded-lg p-3">
            <div>
                {
                    files && files.images.length !== 0 && (<div>
                    <h1 className={filesHead.split('my-3')[0]}>Pictures: ({files.images.length}) </h1>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {
                                files.images.map((k, i) => {
                                    return k.type===FileType.IMAGE && (
                                        <div key={i} className="m-0">
                                            <a target="_blank" href={k.url}>
                                                <img src={k.url} style={{width: '70px', height: '100px', objectFit: 'scale-down'}} className="border border-blue-600 transform transition-transform duration-300 hover:scale-105 hover:shadow-blue-300 shadow shadow-blue-900" alt="My girl's selfie" />
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>)
                }

                {
                    files && files.videos.length !== 0 && (<div>
                    <h1 className={filesHead}>Videos: ({files.videos.length})</h1>
                    <div className="sm:grid sm:grid-cols-2 gap-2">
                        {
                            files.videos.map((v, i) => {
                                return v.type === FileType.VIDEO && (
                                    <div key={i} className="flex flex-col bg-blue-100 rounded-xl p-2 items-center justify-between border">
                                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                                            <video 
                                                src={v.url} 
                                                controls 
                                                preload="metadata"
                                                className="w-full h-full object-contain"
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        {
                                            oneD.b && oneD.url === v.url ? 
                                                <button disabled className="w-full border mt-2 py-1 rounded-lg bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                    Downloading... <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                                :
                                                <button onClick={() => {triggerDownload(v.url); setOneD({b: true, url: v.url})}} className="w-full border mt-2 py-1 rounded-lg hover:bg-blue-300 active:bg-blue-500 bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                    Download <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>)
                }

                {
                    files && files.audios.length > 0 && (<div>
                        <h1 className={filesHead}>Music: ({files.audios.length})</h1>
                        {
                            files.audios.map((a, i) => {
                                return a.type === FileType.AUDIO && (
                                    <div key={i} className="mb-1 flex flex-col bg-blue-100 rounded-xl p-3 items-center justify-between border w-full">
                                        <div className="w-full mb-2 truncate text-center">
                                            <p className="text-sm font-semibold text-zinc-800 truncate px-1">
                                                🎵 {a.name}
                                            </p>
                                        </div>

                                        <div className="w-full flex items-center justify-center bg-white/50 rounded-lg p-1.5 border border-blue-200">
                                            <audio 
                                                src={a.url}
                                                controls 
                                                preload="metadata"
                                                className="w-full h-8"
                                            >
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>

                                        {
                                            oneD.b && oneD.url === a.url ? 
                                                <button disabled className="w-full border mt-2 py-1 rounded-lg bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                    Downloading... <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                                :
                                                <button onClick={() => {triggerDownload(a.url); setOneD({b: true, url: a.url})}} className="w-full border mt-2 py-1 rounded-lg hover:bg-blue-300 active:bg-blue-500 bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                    Download <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>)
                }

                {
                    files && files.other.length > 0 && (<div>
                    <h1 className={filesHead}>Other file types and documents: ({files.other.length})</h1>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-2 p-3 text-xl">
                        {
                            files.other.map((o, i) => {
                                return o.type === FileType.OTHER && (
                                    <div key={i} className="p-2 border rounded-lg bg-blue-100 mb-1 text-wrap">
                                        <p className="text-sm">{o.name.slice(0, 20)}...</p>
                                        <div className="grid grid-cols-2 w-full">
                                            <a href={o.url} target="_blank">
                                                <button className="mr-2 p-2 border mt-3 py-1 rounded-lg hover:bg-blue-300 active:bg-blue-500 bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                    View <FontAwesomeIcon icon={faBookOpenReader} />
                                                </button>
                                            </a>
                                            {
                                                oneD.b && oneD.url === o.url ? 
                                                    <button disabled className="border p-1 rounded-lg bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                        Downloading... <FontAwesomeIcon icon={faDownload} />
                                                    </button>
                                                    :
                                                    <button onClick={() => {triggerDownload(o.url); setOneD({b: true, url: o.url})}} className="border p-1 rounded-lg hover:bg-blue-300 active:bg-blue-500 bg-blue-200 border-blue-500 text-sm font-medium transition-colors">
                                                        Download <FontAwesomeIcon icon={faDownload} />
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>)
                }

                {
                    isFiles && (
                        <p className="caveat text-4xl text-blue-700 m-8">
                            EKSE! No files were shared
                        </p>
                    )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default ReceivedFiles;