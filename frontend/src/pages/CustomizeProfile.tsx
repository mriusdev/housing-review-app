import { useState, useEffect } from "react";
import { Container, Text, Flex, Icon, useMediaQuery } from "@chakra-ui/react";
import { VscEdit } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  toggleEdit,
  getProfile,
  IUserProfile,
  reset,
  updateProfile
} from "../features/profile/privateProfileSlice";
import EditFields from "../components/PrivateProfile/EditFields";
import DisplayFields from "../components/PrivateProfile/DisplayFields";
import {convertDate, waitFor} from '../components/HelperFunctions'

const Customize = () => {
  const [isMoreThanMd] = useMediaQuery('(min-width: 48em)')
  const { isEdit, profileDetails, isSuccess, isLoading, message, isError, isProfileUpdated } = useAppSelector((state) => state.privateProfile);

  const [editDetails, setEditDetails] = useState<IUserProfile>({
    name: "",
    email: "",
    institution: ""
  })

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDetails((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = () => {
    const data = {
      name: editDetails.name,
      email: editDetails.email,
      institution: editDetails.institution
    }
    dispatch(updateProfile(data))
  }

  useEffect(() => {
    if(profileDetails === '' || isProfileUpdated) {
      dispatch(getProfile());
    } else {
      setEditDetails(profileDetails)
    }

    if(isError) {
      toast.error(message);
    }

    waitFor(isSuccess).then(() => {
      setEditDetails(profileDetails)

    })

    dispatch(reset())

  }, [dispatch, isSuccess, isLoading, message, isError]);

  return (
    <>
      <Container padding={0} maxWidth={{base: "100%", md: "1024px"}}>
        <Flex
          bg="brand.orange"
          direction="column"
          justify="center"
          align="center"
          width="100%"
          mt={isMoreThanMd ? 54 : 0 }
          height={{base: "30vh", md: "19vh"}}
          borderBottom="4px"
          borderRadius={isMoreThanMd ? "15px 15px 0px 0px" : ''}
          borderColor={isEdit ? "brand.purple" : "brand.blue"}
        >
          <Flex
            width={{base:"306px", md: "750px"}}
            height="100%"
            pt={{base: 0, md: 5}}
            direction="column"
            align={{base: "center", md: "start"}}
            justify="center"
            pos="relative"
          >
            <Text fontWeight="bold" fontSize={{base: "24px", md: "30px"}} color="brand.mainDark" py={2}>
              Profile Settings
            </Text>
            <Text
              textAlign={{base: "center", md: "left"}}
              lineHeight="16px"
              fontSize={{base: "13px", md: "15px"}}
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
        <Container maxWidth={{base: "306px", md: "750px"}} padding={0} mt={10}>
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
          <Toaster />
        </Container>
      </Container>
    </>
  );
};

export default Customize;
