import { useCallback } from "react"
import {useDropzone,type FileWithPath} from 'react-dropzone'

function Share1() {
    const filesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        console.log(target.files)
    }

    const onDrop = useCallback((selectedFiles: FileWithPath[]) => {
        console.log("Use callback", selectedFiles);

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <div className="w-full min-h-screen">
      <div>
        <h1 className="text-center bangers-font text-4xl m-5 sm:text-8xl">SHARE FILES</h1>
        <div {...getRootProps()}>
            <input {...getInputProps()} onChange={filesChange} type="file" name="filesInput" multiple />
            {
                isDragActive ? 
                    <p>Drop them files to share here bruh</p> :
                    <p>DRag and drop or click to select files to share</p>
            }
        </div>
      </div>
    </div>
  )
}

export default Share1
