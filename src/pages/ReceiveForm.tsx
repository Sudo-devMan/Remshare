import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons/faFileDownload";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReceive, useShare } from "../context";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../config/api";


const textInputClasses: string = "rounded-xl p-2 text-2xl border-2 border-blue-800 bg-blue-400 text-blue-950";

function ReceiveForm() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)

    const {receiveData, setReceiveData} = useReceive();
    const {setShareData} = useShare();

    const receiverEmail= searchParams.get('receiverEmail')
    const uniqueId = searchParams.get('uniqueId')

    useEffect(() => {
        if (receiverEmail && uniqueId) {
            setReceiveData(p => ({...p, receiverEmail, uniqueId}))
        }
    }, [receiverEmail, uniqueId])
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReceiveData(prev => ({ ...prev, [name]: value }));
    };

    const allInfo = !!(receiveData.password && receiveData.receiverEmail && receiveData.uniqueId)

    const subMit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await api.post('sharing/receive/', {...receiveData})
            console.log("Data: ", data)
            setShareData(data.data)
            if (data.status === 201) {
                // console.log(data)
                alert("FIles received successfully. Redirecting to info page")
                navigate('/received-files')
            }
        } catch (err: any) {
            alert(err.response?.data?.message || err.message || "Files not found. Please check your inputs")
            console.log(err)
        } finally {
            setLoading(false)
        }

        // navigate('/received-files')
        // console.log("Receive data: ", receiveData);
    }

    const [show, setShow] = useState(false)
    

    

    return (
        <div className="h-screen sm:px-6">
            <br />
            <h1 className="text-center bangers-font text-6xl sm:text-8xl">
                RECEIVE FILES
            </h1>
            <br />
            <div className="w-full min-h-screen sm:grid sm:grid-cols-2 flex flex-col items-center justify-center p-4 gap-6">
                <form method="post" onSubmit={subMit} className="w-full max-w-md">
                    {
                        !receiverEmail && 
                        <div className="mb-5">
                            <p className="caveat text-xl">Receiver's email:</p>
                            <input 
                                type="email" 
                                name="receiverEmail" 
                                value={receiveData.receiverEmail}
                                onChange={handleChange}
                                placeholder="receiver email..." 
                                className={`${textInputClasses} w-full`}
                            />
                        </div>
                    }
                    <div className="mb-5">
                        <p className="caveat text-xl">Files password:</p>
                        <div className="relative flex items-center">
                            <input 
                                type={show ? "text" : "password"} 
                                name="password" 
                                value={receiveData.password}
                                onChange={handleChange}
                                placeholder="files password..." 
                                className={`${textInputClasses} w-full inline-block`}
                            />
                            <button onClick={() => setShow(p => !p)} type="button" className="absolute text-xl right-3 focus:outline-none">
                                <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
                    {
                        !uniqueId &&
                        <div className="mb-5">
                            <p className="caveat text-xl">Unique ID:</p>
                            <input 
                                type="text" 
                                name="uniqueId" 
                                value={receiveData.uniqueId}
                                onChange={handleChange}
                                placeholder="Unique ID..." 
                                className={`${textInputClasses} w-full`}
                            />
                        </div>
                    }
                    
                    <div className="mt-6 w-full flex justify-center sm:justify-start">
                        {
                            allInfo ? 
                                loading ?
                                    <button disabled type="button" className="text-2xl receive-lg w-full sm:w-auto">
                                        <span>FETCHING... <FontAwesomeIcon icon={faFileDownload} /></span>
                                        <svg aria-hidden="true" className="w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2 inline" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    </button>
                                    :
                                    <button type="submit" className="receive-lg w-full sm:w-auto">
                                        <span>RECEIVE <FontAwesomeIcon icon={faFileDownload} /></span>
                                    </button>
                                :
                                <button disabled className="receive-lg w-full sm:w-auto">
                                    {/* <svg aria-hidden="true" className="w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2 inline" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg> */}
                                    RECEIVE
                                </button>
                        }
                    </div>
                </form>

                <div className="hidden sm:flex justify-center items-center w-full">
                    <object type="image/svg+xml" data="/bgs/receive.svg" className="w-full max-w-[360px] h-auto">
                        <p>your device does not support svgs</p>
                    </object>
                </div>
            </div>
        </div>
    );
}

export default ReceiveForm;