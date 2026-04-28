import { faArrowRight, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback } from "react"
import {useDropzone,type FileWithPath} from 'react-dropzone'
import { Link } from "react-router-dom"

function Share1() {
    const formData: FormData = new FormData()

    const filesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        console.log(target.files)
    }

    const onDrop = useCallback((selectedFiles: FileWithPath[]) => {
        console.log("Use callback", selectedFiles);
        formData.append('shareFiles', JSON.stringify(selectedFiles))
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <div className="w-full h-screen"><br /><br /><br /><br />
      <div>
        <h1 className="text-center bangers-font text-6xl m-5 sm:text-8xl">SHARE FILES</h1>
        <center>
            <div style={{cursor: 'pointer'}} {...getRootProps()} className="flex flex-col align-center justify-center border-2 border-green-700 shadow-xl shadow-green-500/50 bg-green-600 w-70 h-70 p-10 rounded-full text-white text-center caveat text-3xl">
                <input className="hidden" {...getInputProps()} onChange={filesChange} type="file" name="filesInput" multiple />
                {
                    isDragActive ? 
                        <p>Drop them files here bruh...</p> :
                        <p>Click here to select files.. or just drag and drop</p>
                }
                <p className="text-center">
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                </p>
            </div>
        </center>
        <div className="fixed bottom-4 sm:right-4 w-full flex justify-center md:justify-end">
            <Link to="/share/prepare-files" className="share-lg">
                NEXT <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Share1
