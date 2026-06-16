import { faEye, faEyeSlash, faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useShare } from "../context";
import { useState } from "react";
import api from "../config/api";
import type { AxiosResponse } from "axios";
import type { ShareFile } from "../config/types";
import { Link } from "react-router-dom";
import { SHARED_STATE } from "../config/constants";

const textInputClasses: string = "rounded-xl p-2 text-2xl border-2 border-blue-800 bg-blue-400 text-blue-950";


function Share2() {
    const { shareData, setShareData } = useShare();

    const [sharing, setSharing] = useState(false);
    const [shared, setShared] = useState(false);
    const [passType, setPassType] = useState<'password' | 'text'>('password');

    const passToggle = () => {
    setPassType((p) => (p === 'password' ? 'text' : 'password'));
    };

    const handleSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
        ) => {
        e.preventDefault();
        setSharing(true);

        const formData = new FormData();

        formData.append('senderEmail', shareData.senderEmail);
        formData.append('receiverEmail', shareData.receiverEmail);
        formData.append('password', shareData.password);
        formData.append('note', shareData.note);

        const filesArray = shareData.files
            ? Array.from(shareData.files)
            : [];

        filesArray.forEach((file: any) =>
            formData.append('files', file)
        );

        console.log('Files arr bruh', filesArray);

        try {
            const response: AxiosResponse<any, any, ShareFile> =
            await api.post('sharing/share/', formData);

            if (response.status === 201) {
                alert(
                    'Successfully shared files! Redirecting to info page...'
                );

                setShareData((p) => ({
                    ...p,
                    uniqueId: response.data.uniqueId,
                }));

                console.log('Share data: ', shareData);
                console.log('Response: ', response);
                console.log('Unique ID: ', response.data.uniqueId);

                setShared(true);
                localStorage.setItem(SHARED_STATE, 'true');
            }
        } catch (err: any) {
            alert(err.message);
            console.log(err);
        } finally {
            setSharing(false);
        }
    };
  return (
    <div className="h-screen sm:px-6">
        <br /><br />
        <h1 className="text-center bangers-font text-6xl sm:text-8xl">{shared ? 'SHARED' : 'PREPARE'} FILES</h1>
        <br />

       
       {
    !shared && localStorage.getItem(SHARED_STATE) !== 'true' ? (
        <div className="w-full min-h-screen sm:grid sm:grid-cols-2 flex flex-col items-center justify-center p-4 gap-6">
            <form aria-disabled method="post" onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-5">
                    <p className="caveat text-xl">Your email:</p>
                    <input 
                        type="email" 
                        name="senderEmail" 
                        placeholder="your email..." 
                        className={`${textInputClasses} w-full`}
                        onChange={(e) => setShareData((p) => ({...p, senderEmail: e.target.value}))}
                    />
                </div>
                <div className="mb-5">
                    <p className="caveat text-xl">Receiver's email:</p>
                    <input 
                        type="email" 
                        name="receiverEmail" 
                        placeholder="receiver email..." 
                        className={`${textInputClasses} w-full`}
                        onChange={(e) => setShareData((p) => ({...p, receiverEmail: e.target.value}))}
                    />
                </div>
                <div className="mb-5">
                    <p className="caveat text-xl">Files password:</p>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="files password..." 
                        className={`${textInputClasses} w-full`}
                        onChange={(e) => setShareData((p) => ({...p, password: e.target.value}))}
                    />
                </div>
                <div className="mb-5">
                    <p className="caveat text-xl">Note for receiver (optional):</p>
                    <textarea 
                        name="note"
                        onChange={(e) => setShareData((p) => ({...p, note: e.target.value}))}
                        placeholder="type a note for the receiver here..." 
                        className="w-full rounded-xl p-2 text-2xl outline-2 outline-blue-800 bg-blue-400 text-blue-950" 
                        rows={5}
                    ></textarea>
                </div>
                
                <div className="mt-6 w-full flex justify-center sm:justify-start">
                    <button disabled={sharing} type="submit" className="share-lg w-full sm:w-auto">
                        {
                            !sharing ? <span>SHARE <FontAwesomeIcon icon={faFileUpload} /></span> :
                                <span>SHARING...</span>
                        }
                    </button>
                </div>
            </form>

            <div className="hidden sm:flex justify-center items-center w-full">
                <object type="image/svg+xml" data="/bgs/send.svg" className="w-full max-w-[360px] h-auto">
                    <p>your device does not support svgs</p>
                </object>
            </div>
        </div>
    ) : (
        <div className="w-full py-10 px-4 max-w-4xl mx-auto">
            <div className="rounded-sm border border-blue-700 bg-blue-300 p-6 md:p-10 border-3">
                <h1 className="text-center bangers-font text-3xl text-blue-900">Share Information</h1>
                <p className="text-center caveat text-lg mb-6">Successfully shared <span className="font-bold">{shareData.files.length}</span> file{shareData.files.length > 1 ? 's':''} . See info below</p>
                
                <div className="flex flex-col gap-4 mt-2">
                    <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center">
                        <h1 className="caveat font-bold text-2xl sm:mr-3">Receiver email: </h1> 
                        <span className="break-all">{shareData.receiverEmail}</span>
                    </div>
                    
                    <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center">
                        <h1 className="caveat font-bold text-2xl sm:mr-3">Sender email: </h1> 
                        <span className="break-all">{shareData.senderEmail}</span>
                    </div>
                    
                    <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center w-full">
                            <h1 className="caveat font-bold text-2xl sm:mr-3">Password: </h1> 
                            <input type={passType} disabled value={shareData.password} className="bg-transparent outline-none w-full sm:w-auto"/>
                        </div>
                        <span onClick={() => passToggle()} className="cursor-pointer ml-auto sm:ml-2">
                            {passType === 'password' ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                        </span>
                    </div>
                    
                    <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center">
                        <h1 className="caveat font-bold text-2xl sm:mr-3">Unique ID: </h1> 
                        <span className="break-all">{shareData.uniqueId}</span>
                    </div>

                    <div className="bg-blue-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center">
                        <h1 className="caveat font-bold text-2xl sm:mr-3">Note: </h1> 
                        <span className="break-all">{shareData.note}</span>
                    </div>
                    
                    <section className="mt-6 px-2 md:px-15">
                        <h1 className="text-center bangers-font text-3xl text-blue-900 mb-2">Ekse! Please note:</h1>
                        <ul className="caveat list-disc text-xl pl-5 space-y-1">
                            <li>To receive the files you are going to need the <span className="font-bold">password</span>, <span className="font-bold">receiver email</span>, and the <span className="font-bold">unique ID</span></li>
                            <li>This share record will be deleted in 24hrs</li>
                            <li>Files can be downloaded/received as many times as you want</li>
                            <li>We recommend you <span className="text-blue-800">take a screenshot of this page as it may disappear</span> for security purposes if you refresh or leave the page</li>
                        </ul>
                    </section>
                </div>
            </div>
            <Link className="caveat underline text-xl" to={'/'}>Back to home</Link>
        </div>
    )
}
    </div>
  )
}

export default Share2
