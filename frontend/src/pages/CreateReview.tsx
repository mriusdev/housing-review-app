import {
  Flex,
  Button,
  Container,
  Text,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";


import StarRating from "../components/CreateReview/StarRating";

const CreateReview = () => {
  const [formData, setFormData] = useState<any>({})

  const onChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onRatingChange = (rating: number) => {
    setFormData((prev:any) => ({
      ...prev,
      rating
    }))
  }
  return (
    <>
      <Container padding={0} maxWidth={{ base: "100%", md: "1024px" }} height="100vh">
        <Flex
          width="100%"
          direction="column"
          align="center"
          justify="center"
          height="100vh"
        >
          
          <Flex
            width={{base:"306px", md: "750px"}}
            pt={9}
            height="25vh"
            direction="column"
            align="start"
            justify="center"
          >
            <Text fontWeight="bold" fontSize="24px" textAlign="left">
              Create New Review
            </Text>
          </Flex>

          <Flex direction="column" rowGap={4} height="75vh" width={{base:"306px", md: "750px"}}>
            <Flex direction="column">
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

            <Flex direction="column">
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

            <Button bg="#F35BDBA1" height="55px" border="2px" borderStyle="dashed" borderColor="#2D27278A" mb="15px">Drag or click to add images</Button>

            <StarRating onRatingChange={onRatingChange} />


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
        </Flex>
      </Container>
    </>
  );
};

export default CreateReview;
