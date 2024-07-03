import { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Box,
  Tooltip,
  Textarea,
  Button
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { useUser } from "../contexts/UserContext";
import { updateComment } from "../lib/api/fetchComment";
import timeAgo from "../lib/timeAgo";

export const CommentItem = ({comment: initialComment, index, FetchDeleteComment}) => {
  const {currentUser} = useUser();
  const [isEditing, setIsEditing] = useState(false)
  const [comment, setComment] = useState(initialComment)

  const commentEditable = () => {
    if(comment.userId === currentUser.id) {
      setIsEditing(true);
    }
  }

  const changeCommentBody = (value) => {
    setComment(prevComment => ({ ...prevComment, body: value }));
  }

  const fetchUpdateComment = async () => {
    if(comment.userId === currentUser.id) {
      const res = await updateComment(comment.id, comment.body);
      if(res.status === 204) {
        setComment(prevComment => ({ ...prevComment, updatedAt: new Date().toISOString() }))
        setIsEditing(false);
      }else {
        console.log("更新失敗");
      }
    }
  }

  return (
    <Card>
      <CardHeader bgColor="#F7FAFC" h="50px" display="flex" alignItems="center">
        <Flex justifyContent="space-between" width="100%">
          <Text>{comment.userName}</Text>
          {currentUser && currentUser.id === comment.userId &&
            <Box>
              <Tooltip label="編集" bg='gray.100' color='black' opacity="0.5">
                <EditIcon onClick={commentEditable} boxSize={3} cursor="pointer" mr="15px"/>
              </Tooltip>
              <Tooltip label="削除" bg='gray.100' color='black'>
                <DeleteIcon onClick={() =>FetchDeleteComment(index)} boxSize={3} cursor="pointer"/>
              </Tooltip>
            </Box>
          }
        </Flex>
      </CardHeader>

      <CardBody position="relative">
        {isEditing ?
          <>
            <Textarea
              value={comment.body}
              onChange={(e) => changeCommentBody(e.target.value)}
            >
            </Textarea>
            <Button onClick={fetchUpdateComment}>
              更新する
            </Button>
          </>
        :
          <>
            <Text>{comment.body}</Text>
            <Text
              fontSize="xs"
              color="#718096"
              as="i"
              position="absolute"
              bottom="8px"
              right="20px"
            >
              最終更新 {timeAgo(comment.updatedAt)}
            </Text>
          </>
        }
      </CardBody>
    </Card>
  )
}
