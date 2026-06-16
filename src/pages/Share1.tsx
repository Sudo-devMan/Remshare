import { faArrowRight, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useState } from "react"
import { useDropzone, type FileWithPath } from "react-dropzone"
import { Link } from "react-router-dom"
import { useShare } from "../context"

function Share1() {
    const [fileNames, setFileNames] = useState<string[]>([])
    const { setShareData } = useShare()

    const handleFiles = (files: File[]) => {
        if (!files.length) return

        setShareData(prev => ({
            ...prev,
            files
        }))

        setFileNames(prev => [
            ...prev,
            ...files.map(file => file.name)
        ])
    }

    const filesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(Array.from(e.target.files ?? []))
    }

    const onDrop = useCallback((files: FileWithPath[]) => {
        handleFiles(files)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    })

    const hasFiles = fileNames.length > 0

    return (
        <div className="w-full min-h-screen pt-20">
            <h1 className="text-center bangers-font text-6xl m-5 sm:text-8xl">
                SHARE FILES
            </h1>

            <div className="flex justify-center px-4">
                <div
                    {...getRootProps()}
                    className="cursor-pointer flex flex-col items-center justify-center border-2 border-green-700 shadow-xl shadow-green-500/50 bg-green-600 w-full max-w-md min-h-80 p-8 rounded-3xl text-white text-center caveat text-3xl"
                >
                    <input
                        {...getInputProps()}
                        onChange={filesChange}
                        type="file"
                        name="filesInput"
                        multiple
                    />

                    <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-5xl mb-4"
                    />

                    {hasFiles ? (
                        <>
                            <p className="font-bold mb-3">
                                {fileNames.length} file(s) selected
                            </p>

                            <div className="w-full max-h-40 overflow-y-auto space-y-1">
                                {fileNames.map((fname, index) => (
                                    <p
                                        key={`${fname}-${index}`}
                                        className="text-yellow-300 text-sm truncate"
                                    >
                                        {fname}
                                    </p>
                                ))}
                            </div>
                        </>
                    ) : isDragActive ? (
                        <p>Drop files here</p>
                    ) : (
                        <p>
                            Drag & drop files here
                            <br />
                            or click to browse
                        </p>
                    )}
                </div>
            </div>

            <div className="fixed bottom-4 right-0 left-0 md:left-auto md:right-4 flex justify-center md:justify-end px-4">
                <Link
                    to={hasFiles ? "/share/prepare-files" : "#"}
                    className={`share-lg ${
                        !hasFiles ? "opacity-50 pointer-events-none" : ""
                    }`}
                >
                    NEXT <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
        </div>
    )
}

export default Share1