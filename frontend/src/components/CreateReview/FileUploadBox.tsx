import { useEffect, useState, useCallback } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Flex, Image, Text, Icon, Progress } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid'
import { storage, deleteStorageFile, storageRef } from "../../firebase/config";

import uploadProgress from "../../firebase/uploadProgress";
import {useAppSelector} from '../../app/hooks'

// import { IFormData } from '../../pages/CreateReview'

interface Props {
  files: FileList[]
  file: any
  fileIndex: number
  setFormData: React.Dispatch<React.SetStateAction<any>>
  setFiles: React.Dispatch<React.SetStateAction<any>>
}

const FileUploadBox = ({files, file, fileIndex, setFormData, setFiles}: Props) => {
  const [progress, setProgress] = useState<number>(100)
  const [imageUrl, setImageUrl] = useState<string>("")
  
  const { user } = useAppSelector((state) => state.auth)

  const currentUserId = user?._id
  console.log(file);
  const uploadImage = async() => {
    console.log(file.name);
    console.log(process.env.REACT_APP_PROJECT_ID);
    
    const imageName = uuidv4() + "." + file.name.split(".").pop()
    try {
      const url = await uploadProgress(
        file,
        `reviewImages/${currentUserId}`,
        imageName,
        setProgress
      )
      console.log(url)
      setImageUrl(url as string)
      setFormData((prevData: any) => ({
        ...prevData,
        images: [
          url
        ]

      }))
    } catch (error: any) {
      alert(error.message)
      console.log(error);
      
    }

  }
  
  
  useEffect(() => {
    uploadImage()
  }, [file])
  const onClick = () => {
    // console.log(imageUrk);
    
    const fileInStorage = storageRef(storage, imageUrl)

    deleteStorageFile(fileInStorage).then(() => {
      setFiles(files.filter((file: any, i: number) => i !== fileIndex))
      setFormData((prevData: any) => ({
        ...prevData,
        images: [
          prevData.images.filter((img: string) => img !== imageUrl)
        ]
      }))
      setImageUrl("")
    }).catch((error) => {
      console.log(error);
      
    })
  }
  return (
    <Flex
      height={16}
      justify="space-between"
      px={4}
      align="center"
      pos="relative"
      bg="gray.100"
      borderRadius="15px"
      overflow="hidden"
    >
      <Flex maxW="84%" align="center" columnGap={2}>
        <Image
          boxSize="45px"
          objectFit="cover"
          src={imageUrl}
          alt="Dan Abramov"
          fallbackSrc='https://via.placeholder.com/150'
          opacity={ progress < 100 ? "0.5" : "1"}
        />
        <Text noOfLines={1} fontSize={15} overflow="hidden" opacity={ progress < 100 ? "0.5" : "1"}>
          {file.name}
        </Text>
      </Flex>
      <Flex align="center" justify="center" cursor="pointer" p={{base: 0, md: 3}} onClick={onClick}>
        <Icon as={ImCancelCircle} w={6} h={6} _hover={{color: "red.600"}} />
      </Flex>
      <Progress
        left="0"
        bottom="0"
        width="100%"
        pos="absolute"
        hasStripe
        value={30}
        height="7px"
        isIndeterminate
        display={progress < 100 ? "block" : "none"}
      />
    </Flex>
  );
};

export default FileUploadBox;
