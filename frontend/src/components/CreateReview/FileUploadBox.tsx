import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Flex, Image, Text, Icon, Progress } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid'

import uploadProgress from "../../firebase/uploadProgress";
import {useAppSelector} from '../../app/hooks'

interface Props {
  file?: any
}

const FileUploadBox = ({file}: Props) => {
  const [progress, setProgress] = useState<number>(100)
  const [imageUrl, setImageUrl] = useState<string>("")

  const { user } = useAppSelector((state) => state.auth)

  const currentUserId = user?._id

  // useEffect(() => {
  //   const uploadImage = async() => {
  //     const imageName = uuidv4() + "." + file.name.split(".").pop()
  //     try {
  //       const url = await uploadProgress(
  //         file,
  //         `reviewImages/${currentUserId}`,
  //         imageName,
  //         setProgress
  //       )
  //       console.log(url)
  //     } catch (error: any) {
  //       alert(error.message)
  //       console.log(error);
        
  //     }

  //   }

  // }, [file])
  // setImageUrl(URL.createObjectURL(file))
  const percentTester = 95
  const onClick = () => {
    
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
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          opacity={ percentTester < 100 ? "0.5" : "1"}
        />
        <Text noOfLines={1} fontSize={15} overflow="hidden" opacity={ percentTester < 100 ? "0.5" : "1"}>
          image2019groupchat.png231321312321312312312
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
        display={percentTester < 100 ? "block" : "none"}
      />
    </Flex>
  );
};

export default FileUploadBox;
