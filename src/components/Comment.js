import React, { useState } from "react";

import {
  Box,
  Text,
  Flex,
  Textarea,
  useDisclosure,
  Stack
} from "@chakra-ui/react";

import { LoginRequiredMessage } from "./modals/LoginRequiredMessage";
import { CommentItem } from "./CommentItem";
import { SubmitButton } from "./SubmitButton";
import { useUser } from "../contexts/UserContext";
import { postComment, deleteComment } from "../lib/api/fetchComment";

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
          <SubmitButton
            w={"250px"}
            h={"70px"}
            borderRadius={"50px"}
            onClick={isLoggedIn ? fetchPostComment : onOpen}
            content={"投稿する"}
          />
          <LoginRequiredMessage
            isOpen={isOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            message={"コメント"}
          />
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