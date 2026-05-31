import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sendSvg from "../assets/bgs/receive.svg";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons/faFileDownload";
import api from "../config/api";
import type { AxiosResponse } from "axios";

const textInputClasses: string = "rounded-xl p-2 text-2xl border-2 border-blue-800 bg-blue-400 text-blue-950";

interface FileData {
    id: number;
    name: string;
    url: string;
}

function ReceiveForm() {
    const [receiveData, setReceiveData] = useState({
        receiverEmail: "",
        password: "",
        uniqueId: ""
    });
    const [loading, setLoading] = useState(false);
    const [received, setReceived] = useState(false);
    const [downloadedFiles, setDownloadedFiles] = useState<FileData[]>([]);
    const [showAllFiles, setShowAllFiles] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReceiveData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response: AxiosResponse<any> = await api.post('sharing/receive/', receiveData);
            
            if (response.status === 200 || response.status === 201) {
                alert('Files retrieved successfully!');
                
                // Set the structured files array populated by the backend
                if (response.data?.files) {
                    setDownloadedFiles(response.data.files);
                }
                setReceived(true);
            }
        } catch (err: any) {
            alert(err.response?.data?.message || err.message || "Failed to fetch files. Check your credentials.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Programmatic click execution for dynamic multi-file batch downloading
    const handleDownloadAll = () => {
        downloadedFiles.forEach((file) => {
            if (file.url) {
                const link = document.createElement('a');
                link.href = file.url;
                link.download = file.name || 'download';
                link.target = '_blank';
                link.rel = 'noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    return (
        <div className="h-screen sm:px-6">
            <br /><br />
            <h1 className="text-center bangers-font text-6xl sm:text-8xl">
                {received ? 'RECEIVED' : 'RECEIVE'} FILES
            </h1>
            <br />

            {
                !received ? (
                    <div className="w-full min-h-screen sm:grid sm:grid-cols-2 flex flex-col items-center justify-center p-4 gap-6">
                        <form method="post" onSubmit={handleSubmit} className="w-full max-w-md">
                            <div className="mb-5">
                                <p className="caveat text-xl">Receiver's email:</p>
                                <input 
                                    type="email" 
                                    name="receiverEmail" 
                                    value={receiveData.receiverEmail}
                                    onChange={handleChange}
                                    placeholder="receiver email..." 
                                    className={`${textInputClasses} w-full`}
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <p className="caveat text-xl">Files password:</p>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={receiveData.password}
                                    onChange={handleChange}
                                    placeholder="files password..." 
                                    className={`${textInputClasses} w-full`}
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <p className="caveat text-xl">Unique ID:</p>
                                <input 
                                    type="text" 
                                    name="uniqueId" 
                                    value={receiveData.uniqueId}
                                    onChange={handleChange}
                                    placeholder="Unique ID..." 
                                    className={`${textInputClasses} w-full`}
                                    required
                                />
                            </div>
                            
                            <div className="mt-6 w-full flex justify-center sm:justify-start">
                                <button type="submit" disabled={loading} className="receive-lg w-full sm:w-auto">
                                    {loading ? (
                                        <span>FETCHING...</span>
                                    ) : (
                                        <span>RECEIVE <FontAwesomeIcon icon={faFileDownload} /></span>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="hidden sm:flex justify-center items-center w-full">
                            <object type="image/svg+xml" data={sendSvg} className="w-full max-w-[360px] h-auto">
                                <p>your device does not support svgs</p>
                            </object>
                        </div>
                    </div>
                ) : (
                    <div className="w-full py-10 px-4 max-w-4xl mx-auto">
                        <div className="rounded-sm border border-blue-700 bg-blue-300 p-6 md:p-10 border-3">
                            <h1 className="text-center bangers-font text-3xl text-blue-900">Download Information</h1>
                            <p className="text-center caveat text-lg mb-6">Your download request was authenticated successfully.</p>
                            
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center">
                                    <h1 className="caveat font-bold text-2xl sm:mr-3">Receiver: </h1> 
                                    <span className="break-all">{receiveData.receiverEmail}</span>
                                </div>
                                
                                <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center">
                                    <h1 className="caveat font-bold text-2xl sm:mr-3">Unique ID Authenticated: </h1> 
                                    <span className="break-all">{receiveData.uniqueId}</span>
                                </div>

                                {/* File List Section */}
                                {downloadedFiles.length > 0 && (
                                    <div className="bg-blue-200 p-4 rounded-lg flex flex-col">
                                        <h1 className="caveat font-bold text-2xl mb-3">Available Files:</h1>
                                        
                                        <ul className="space-y-2 mb-1">
                                            {downloadedFiles
                                                .slice(0, showAllFiles ? downloadedFiles.length : 5)
                                                .map((file, idx) => (
                                                    <li key={file.id || idx} className="flex items-center justify-between p-2 rounded-lg bg-blue-100 hover:bg-blue-50 transition-colors">
                                                        <span className="break-all pr-4 text-lg font-medium text-blue-950">
                                                            {file.name}
                                                        </span>
                                                        {file.url && (
                                                            <a 
                                                                href={file.url} 
                                                                download={file.name}
                                                                target="_blank" 
                                                                rel="noreferrer"
                                                                className="text-blue-800 hover:text-blue-600 p-1 text-xl flex items-center"
                                                                title={`Download ${file.name}`}
                                                            >
                                                                <FontAwesomeIcon icon={faFileDownload} />
                                                            </a>
                                                        )}
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        {/* Show More toggle controls */}
                                        {downloadedFiles.length > 5 && (
                                            <button 
                                                type="button"
                                                onClick={() => setShowAllFiles(!showAllFiles)}
                                                className="text-left text-sm font-bold text-blue-900 hover:underline mb-4 mt-1"
                                            >
                                                {showAllFiles ? "See Less ▲" : `See More (${downloadedFiles.length - 5} more) ▼`}
                                            </button>
                                        )}

                                        {/* Download All CTA element */}
                                        <div className="mt-2 pt-3 border-t border-blue-300 flex justify-end">
                                            <button 
                                                type="button"
                                                onClick={handleDownloadAll}
                                                className="bg-blue-800 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-950 transition-colors flex items-center gap-2"
                                            >
                                                Download All ({downloadedFiles.length}) <FontAwesomeIcon icon={faFileDownload} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                <section className="mt-6 px-2 md:px-15">
                                    <h1 className="text-center bangers-font text-3xl text-blue-900 mb-2">Ekse! Please note:</h1>
                                    <ul className="caveat list-disc text-xl pl-5 space-y-1">
                                        <li>If your dynamic browser downloads haven't started, check your popup permissions.</li>
                                        <li>This share session parameters expire 24 hours from initial upload creation.</li>
                                        <li>You can re-request this payload using these exact access details up until termination.</li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ReceiveForm;