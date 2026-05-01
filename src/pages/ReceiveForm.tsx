

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import sendSvg from "../assets/bgs/receive.svg"
import { faFileDownload } from "@fortawesome/free-solid-svg-icons/faFileDownload";
import { Link } from "react-router-dom";

const textInputClasses: string = "rounded-xl p-2 text-2xl border-2 border-blue-800 bg-blue-400 text-blue-950";

function ReceiveForm() {
  return (
    <div className="h-screen sm:px-6">
        <br /><br />
        <h1 className="text-center bangers-font text-6xl sm:text-8xl">RECEIVE FILES</h1>
        <br />

        {/* <center> */}
            <div className="w-full h-[70vh] sm:grid sm:grid-cols-2 flex flex-col align-center justify-center p-4">
                <form method="post">
                    <div className="mb-5">
                        <p className="caveat text-xl">Receiver's email:</p>
                        <input 
                            type="email" 
                            name="receiverEmail" 
                            placeholder="receiver email..." 
                            className={`${textInputClasses}`}/>
                    </div>
                    <div className="mb-5">
                        <p className="caveat text-xl">Files password:</p>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="files password..." 
                            className={`${textInputClasses}`}/>
                    </div>
                    
                    <div className="fixed bottom-4 sm:right-4 w-full flex justify-center md:justify-end">
                        <Link to='/received-files' > {/* REMOVE THIS LINK COMPONENT */}
                            <button className="receive-lg"> {/* ADD TYPE SUBMIT WHEN CONNECTING TO BACKEND */}
                                RECEIVE <FontAwesomeIcon icon={faFileDownload} />
                            </button>
                        </Link>
                    </div>
                </form>
                <div className="hidden sm:block">
                    <object type="image/svg+xml" data={sendSvg} width="360" height="260">
                        <p>your device does not support svgs</p>
                </object>
                </div>
            </div>
        {/* </center> */}
    </div>
  )
}

export default ReceiveForm;