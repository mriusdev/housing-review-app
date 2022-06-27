import {
  Flex,
  Button,
  Container,
  Text,
  Input,
  Textarea,
  Icon
} from "@chakra-ui/react";
import { useState } from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
  onRatingChange: (rating: number) => void
}

const StarRating = ({ onRatingChange }: Props) => {
  const [rating, setRating] = useState<number>(0);

  const onClick = (index: number, onRatingChange: (rating: number) => void) => {
    setRating(index)
    onRatingChange(rating)
  }
  return (
    <Flex direction="column" justify="center" align="center" rowGap="10px">
      <Text>
        Rate your stay
      </Text>
      <Flex width="85%" justify="space-between" align="center">
        {[...Array(5)].map((_, index) => {
          index += 1
          return (
            <button
              type="button"
              key={index}
              onClick={() => onClick(index, onRatingChange)}
            >
              {index <= rating ? (
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