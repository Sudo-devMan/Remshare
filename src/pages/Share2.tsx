import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import sendSvg from "../assets/bgs/send.svg"

const textInputClasses: string = "rounded-xl p-2 text-2xl border-2 border-blue-800 bg-blue-400 text-blue-950";

function Share2() {
  return (
    <div className="h-screen sm:px-6">
        <br /><br />
        <h1 className="text-center bangers-font text-6xl sm:text-8xl">PREPARE FILES</h1>
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
                    <div>
                        <p className="caveat text-xl">Note for receiver(optional):</p>
                        <textarea 
                            name="note" 
                            placeholder="type a note for the receiver here..." 
                            className="rounded-xl p-2 text-2xl outline-2 outline-blue-800 bg-blue-400 text-blue-950" cols={23} rows={5}></textarea>
                    </div>
                    <div className="fixed bottom-4 sm:right-4 w-full flex justify-center md:justify-end">
                        <button className="share-lg"> {/* ADD TYPE SUBMIT WHEN CONNECTING TO BACKEND */}
                            SHARE <FontAwesomeIcon icon={faFileUpload} />
                        </button>
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

export default Share2
