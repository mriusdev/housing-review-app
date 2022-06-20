import { useState, useEffect } from "react";
import { Container, Text, Flex, Icon } from "@chakra-ui/react";
import { VscEdit } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  toggleEdit,
  getProfile,
  IUserProfile,
  reset
} from "../features/profile/privateProfileSlice";
import EditFields from "../components/PrivateProfile/EditFields";
import DisplayFields from "../components/PrivateProfile/DisplayFields";
import {convertDate, waitFor} from '../components/HelperFunctions'

const Customize = () => {
  const { isEdit, profileDetails, isSuccess } = useAppSelector((state) => state.privateProfile);

  const [editDetails, setEditDetails] = useState<IUserProfile>({
    name: "starting data",
    email: "starting data",
    institution: "starting data",
    createdAt: "starting data",
    updatedAt: "starting data"
  })

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDetails((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = () => {
    // dispatch(updateProfile(editDetails))
  }

  useEffect(() => {
    if(profileDetails === '') {
      dispatch(getProfile());
    }
    
    waitFor(isSuccess).then(() => {
      setEditDetails(profileDetails)

    })

  }, [dispatch, isSuccess]);

  return (
    <>
      <Flex
        bg="brand.orange"
        direction="column"
        justify="center"
        align="center"
        width="100vw"
        height="30vh"
        borderBottom="4px"
        borderColor={isEdit ? "brand.purple" : "brand.blue"}
      >
        <Flex
          width="306px"
          height="100%"
          direction="column"
          align="center"
          justify="center"
          pos="relative"
        >
          <Text fontWeight="bold" fontSize="24px" color="brand.mainDark" py={2}>
            Profile Settings
          </Text>
          <Text
            textAlign="center"
            lineHeight="16px"
            fontSize="13px"
            color="brand.mainDark"
          >
            Created at: <br />
            {convertDate(profileDetails?.createdAt)}
          </Text>

          <Flex
            cursor="pointer"
            align="center"
            justify="center"
            bg={isEdit ? "brand.purple" : "brand.blue"}
            borderRadius="50%"
            pos="absolute"
            right="0"
            bottom="-7"
            padding={4}
            onClick={() => dispatch(toggleEdit())}
          >
            <Icon
              as={isEdit ? MdOutlineCancel : VscEdit}
              height="24px"
              width="24px"
            />
          </Flex>
        </Flex>
      </Flex>
      <Container maxWidth="306px" padding={0} mt={10}>
        <Flex direction="column" rowGap={16}>
          {isEdit ? (
            <EditFields
              name={editDetails.name}
              email={editDetails.email}
              institution={editDetails.institution}
              onChange={onChange}
              onClick={onClick}
            />
          ) : (
            <DisplayFields
              name={profileDetails?.name}
              email={profileDetails?.email}
              institution={profileDetails?.institution}
            />
          )}

          <Flex columnGap={3}>
            <Flex align="center" justify="center">
              <Icon as={VscEdit} />
            </Flex>
            <Text lineHeight="16px" fontSize="13px" color="brand.mainDark">
              Updated at: <br />
              {convertDate(profileDetails?.updatedAt)}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Customize;
