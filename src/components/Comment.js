import React, { useState } from "react"

import {
  Box,
  Text,
  Flex,
  Textarea,
  Button,
  useDisclosure,
  Stack
} from "@chakra-ui/react"

import { useUser } from "../contexts/UserContext"
import { LoginRequiredMessage } from "./LoginRequiredMessage"
import { CommentItem } from "./CommentItem"
import { postComment, deleteComment } from "../lib/api/fetchComment"

export const Comment = ({rateId, comments: initialComments}) => {
  const { isLoggedIn, currentUser } = useUser();
  const [commentBody, setCommentBody] = useState();
  const [comments, setComments] = useState(initialComments);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const fetchPostComment = async () => {
    const res = await postComment(rateId, commentBody);
    if (res.status === 201) {
      const newComment = {
        id: res.data.id,
        userId: currentUser.id,
        userName: currentUser.name,
        body: res.data.body,
        updatedAt: res.data.updatedAt,
      };
      setComments([newComment, ...comments]);
      setCommentBody("");
    } else {
      console.log("Error posting comment:", res);
    }
  }

  const FetchDeleteComment = async (index) => {
    if(comments[index].userId === currentUser.id) {
      const res = await deleteComment(comments[index].id)
      if(res.status === 204) {
        setComments(prevComments => prevComments.filter((_, i) => i !== index));
      }
    }
  }

  return (
    <Box mt="70px" w="80%" mx="auto">
      <Box mb="20px" borderColor="#89DA59" borderBottomWidth="2px">
        <Text fontSize="sm" as="b">コメント欄</Text>
      </Box>
    
      <Box>
        <Flex justifyContent="space-around">
          <Textarea
            w="60%"
            placeholder="コメントを追加する"
            value={commentBody || ""}
            onChange={(e) => setCommentBody(e.target.value)}
          ></Textarea>
          <Button
            as='button'
            my="20px"
            w="250px"
            h="70px"
            color="#89DA59"
            bg="white"
            borderColor='#89DA59'
            borderRadius="50px"
            borderWidth="4px"
            _hover={{ bg: '#89DA59', color: "white" }}
            onClick={isLoggedIn ? fetchPostComment : onOpen}
          >
            投稿する
          </Button>
          <LoginRequiredMessage isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}></LoginRequiredMessage>
        </Flex>

        <Box mt="30px">
          <Stack spacing={3}>
            {comments && comments.map((comment, index) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                index={index}
                FetchDeleteComment={FetchDeleteComment}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}