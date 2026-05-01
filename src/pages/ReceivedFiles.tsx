import { faCloudDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import sendSvg from "../assets/bgs/about.svg"

// TODO: How to truncate text in tailwind or css
//       Then add some state for a see more feature

function ReceivedFiles() {
  return (
    <div className="h-screen sm:px-6">
        <br /><br />
        <h1 className="text-center bangers-font text-6xl sm:text-8xl">RECEIVED FILES</h1>
        <div className="caveat text-2xl p-3 border-1 rounded-xl shadow w-80 m-3">
            <b className="text-share">FROM:</b> example.email@bruh.com <br /> <center><hr className="my-2 w-[67%] border-1 border-blue-600" /></center>
            <b className="text-receive">TO:</b> broskie@gmail.com <br /> <center><hr className="my-2 w-[67%] border-1 border-green-600" /></center>
            <b className="text-blue-700">NOTE:</b> <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque enim voluptates quis deleniti <br /><b className="text-blue-600">...see more</b></span>
        </div>
        <br />

        {/* <center> */}
            <div className="w-full sm:h-[70vh] sm:grid sm:grid-cols-2 flex flex-col align-center justify-center p-4">
                
                <div>
                    <table className="bg-green-600 text-white m-1">
                        <tbody>
                            <tr>
                                <th>FILE</th>
                                <th>SIZE</th>
                                <th>DOWNLOAD</th>
                            </tr>

                            <tr>
                                <td>epstein-files-432.pdf</td>
                                <td>23mb</td>
                                <td>
                                    <FontAwesomeIcon icon={faCloudDownload} />
                                </td>
                            </tr>
                            <tr>
                                <td>arch-riced.iso</td>
                                <td>2gb</td>
                                <td>
                                    <FontAwesomeIcon icon={faCloudDownload} />
                                </td>
                            </tr>
                            <tr>
                                <td>mint-secrets.pdf</td>
                                <td>3kb</td>
                                <td>
                                    <FontAwesomeIcon icon={faCloudDownload} />
                                </td>
                            </tr>
                            <tr>
                                <td>mint-secrets.pdf</td>
                                <td>3kb</td>
                                <td>
                                    <FontAwesomeIcon icon={faCloudDownload} />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                
                <div className="fixed bottom-4 sm:right-4 w-full flex justify-center md:justify-end">
                    <button type="submit" className="receive-lg text-3xl">
                        DOWNLOAD ALL <FontAwesomeIcon icon={faCloudDownload} />
                    </button>
                </div>

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

export default ReceivedFiles
