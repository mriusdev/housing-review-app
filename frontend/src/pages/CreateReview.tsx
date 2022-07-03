import {
  Flex,
  Button,
  Container,
  Text,
  Input,
  Textarea,
  useMediaQuery
} from "@chakra-ui/react";
import { useState, useRef } from "react";

import StarRating from "../components/CreateReview/StarRating";
import FileUploadBox from "../components/CreateReview/FileUploadBox";

export interface IFormData {
  institution?: string,
  description?: string,
  rating: number,
  images: string[]
}

const CreateReview = () => {
  const [isMoreThanMd] = useMediaQuery('(min-width: 48em)')

  const [formData, setFormData] = useState<IFormData>({
    rating: 0,
    images: []
  })
  const [files, setFiles] = useState<FileList[]>([])

  const onChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((prevFiles: any) => ([
      ...prevFiles,
      {
        ...e.target.files
      }
    ]))

    // setFiles([{...e.target.files}])
    // console.log(files.map((file) => Object.keys(file)[0]));
    // files.forEach((file) => {
    //   console.log(file[0]);
      
    // })
    
  }
  return (
    <>
      <Container padding={0} maxWidth={{ base: "100%", md: "1024px" }}>
        <Flex
          width="100%"
          direction="column"
          align="center"
          height={{base: "30vh", md: "19vh"}}
          justify="center"
          mt={isMoreThanMd ? 54 : 0 }
        >
          
          <Flex
            width={{base:"306px", md: "750px"}}
            align="start"
            justify="flex-start"
          >
            <Text fontWeight="bold" pt={10} fontSize="24px" textAlign="left">
              Create New Review
            </Text>
          </Flex>
        </Flex>

        <Container maxWidth={{base: "306px", md: "750px"}} padding={0}>
          <Flex
            direction="column"
            rowGap={4}
            height="auto"
            pb={16}
            justify="center"
            align="center"
          >
            <Flex direction="column" width="100%">
              <Text fontSize="15px" fontWeight="bold">
                Institution
              </Text>
              <Input
                type="text"
                focusBorderColor="brand.blue"
                borderColor="#2d27278a"
                bg="#5b8ff30d"
                fontSize={{ base: "15px", xl: "14px" }}
                placeholder="write somn"
                name="institution"
                height="33px"
                color="brands.mainDark"
                onChange={onChange}
                value={formData.institution}
              />
            </Flex>

            <Flex direction="column" width="100%">
              <Text fontSize="15px" fontWeight="bold">
                Description
              </Text>
              <Textarea
                focusBorderColor="brand.blue"
                borderColor="#2d27278a"
                bg="#5b8ff30d"
                fontSize={{ base: "15px", xl: "14px" }}
                placeholder="write somn"
                name="description"
                height="20ch"
                color="brands.mainDark"
                onChange={onChange}
                value={formData.description}
              />
            </Flex>

            <Button
              bg="#F35BDBA1"
              height={{base: "55px", md: "70px"}}
              border="2px"
              width="100%"
              borderStyle="dashed"
              borderColor="#2D27278A"
              mb="15px"
              pos="relative"
              fontSize="14px"
              fontWeight="normal"
            >
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                onChange={handleUploadChange}
              />
              Drag or click to add images
            </Button>

            {files && files.map((file: any, index: number) => (
              <FileUploadBox
                key={index}
                fileIndex={index}
                files={files}
                file={file[0]}
                setFormData={setFormData}
                setFiles={setFiles}
              />
              
            ))}

            <StarRating formData={formData} setFormData={setFormData} />

            <Button
              colorScheme="yellow"
              fontWeight="bold"
              fontSize="17px"
              color="brands.mainDark"
              width="100%"
              mt="20px"
              disabled
            >
              Post Review
            </Button>
          </Flex>
        </Container>
      </Container>
    </>
  );
};

export default CreateReview;
