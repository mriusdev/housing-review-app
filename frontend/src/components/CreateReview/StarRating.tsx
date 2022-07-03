import {
  Flex,
  Text,
  Icon
} from "@chakra-ui/react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { IFormData } from '../../pages/CreateReview'

interface Props {
  // onRatingChange: (rating: number) => void
  formData: IFormData,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

const StarRating = ({ formData, setFormData }: Props) => {
  // const [rating, setRating] = useState<number>(0);

  const onClick = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: index

    }))
    
    // onRatingChange(rating)
  }
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      width="100%"
      rowGap="1ch"
      mt={10}
    >
      <Text>
        Rate your stay
      </Text>
      <Flex width={{base: "85%", md: "50%"}} justify="space-between" align="center">
        {[...Array(5)].map((_, index) => {
          index += 1
          return (
            <button
              type="button"
              key={index}
              onClick={() => onClick(index)}
            >
              {index <= formData.rating ? (
                <Icon
                  as={AiFillStar}
                  color="yellow.400"
                  height="40px"
                  width="40px"
                />
              ):(
                <Icon
                  as={AiOutlineStar}
                  color="yellow.400"
                  height="40px"
                  width="40px"
                />
              )}
            </button>
          )
        })}
        
      </Flex>
    </Flex>
  )
}

export default StarRating