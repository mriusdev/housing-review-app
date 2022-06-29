import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./config"

interface Props {
  file: any
  folder: any
  imgName: string
  setProgress: (progress: number) => void
}

const uploadProgress = ({file, folder, imgName, setProgress}: Props) => {
  return new Promise((resolve, reject) => {
    // storageRef - where data should be uploaded
    const storageRef = ref(storage, folder + '/' + imgName)
    const upload = uploadBytesResumable(storageRef, file)
    upload.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgress(progress)
    }, (error) => {
      reject(error)
    }, async () => {
      // on upload finish

      try {
        const url = await getDownloadURL(storageRef)
        resolve(url)
      } catch (error) {
        reject(error)
      }
    })
  })
}

export default uploadProgress