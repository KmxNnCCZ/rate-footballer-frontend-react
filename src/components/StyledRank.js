import { keyframes } from "@emotion/react";
import { Text, Flex } from "@chakra-ui/react";

export const StyledRank = ({ rank }) => {
  const gradientAnimation = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  // ランキングごとのスタイルを設定する関数
  // Webkitをまとめて書こうとするとバグる
  const getRankStyles = (rank) => {
    switch (rank) {
      case 1:
        return {
          background: "linear-gradient(45deg, #DAAF08 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #DAAF08 90% 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          backgroundSize: "500% 200%",
          animation: `${gradientAnimation} 5s infinite cubic-bezier(.62, .28, .23, .99) both`,
        };
      case 2:
        return {
          background: "linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          backgroundSize: "500% 200%",
          animation: `${gradientAnimation} 5s infinite cubic-bezier(.62, .28, .23, .99) both`,
        };
      case 3:
        return {
          background: "linear-gradient(45deg, #a57e65 0%, #a57e65 45%, #f3cfb8 70%, #a57e65 85%, #a57e65 90% 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          backgroundSize: "500% 200%",
          animation: `${gradientAnimation} 5s infinite cubic-bezier(.62, .28, .23, .99) both`,
        };
      default:
        return {
          color: "gray.700",
          backgroundSize: "500% 200%",
          animation: `${gradientAnimation} 5s infinite cubic-bezier(.62, .28, .23, .99) both`,
          fontWeight: "bold",
        };
    }
  };

  return (
    <Flex align="center">
      <Text
        fontSize="2xl"
        style={getRankStyles(rank)}
        mr={1}
      >
        {rank}
      </Text>
      <Text fontSize="sm" color="gray.500" mt="10px">
        位
      </Text>
    </Flex>
  );
};
