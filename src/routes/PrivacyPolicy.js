// プライバシーポリシー
import { Link as ReactRouterLink } from "react-router-dom";

import {
  Text,
  Heading,
  Box,
  VStack,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Article = ({ children }) => {
  return (
    <Text
      fontSize="xl"
      as="b"
      borderLeftColor="#89DA59"
      borderLeftWidth="5px"
      b="30px"
      pl="10px"
    >
      {children}
    </Text>
  )
}

const ArticleText = ({ children }) => {
  return (
    <Box mt="10px" w="90%" mx="auto">
      {children}
    </Box>
  )
}

const ParentUnorderedList = ({ children }) => {
  return (
    <UnorderedList spacing={2} fontSize="md">
      {children}
    </UnorderedList>
  )
}

const ChildUnorderedList = ({ children }) => {
  return (
    <UnorderedList spacing={1} mt="10px" fontSize="sm">
      {children}
    </UnorderedList>
  )
}

const GrandChildUnorderedList = ({ children }) => {
  return (
    <UnorderedList spacing={1} mt="10px" fontSize="xs">
      {children}
    </UnorderedList>
  )
}


export const PrivacyPolicy = ({ children }) => {
  return (
    <Box
      w="85%"
      mx="auto"
      bgColor="#F7FAFC"
      p="50px 30px"
      color="#2D3748"
      borderRadius="20px"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
    >
      <Heading mb="40px">プライバシーポリシー</Heading>

      <Text mb="30px" >
        本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
      </Text>

      <VStack spacing='50px' align="flex-start">
        <Box>
          <Article>第1条（個人情報）</Article>
          <ArticleText>
              「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
            </ArticleText>
        </Box>

        <Box>
          <Article>第2条（個人情報の収集方法）</Article>
          <ArticleText>
            当社は，ユーザーが利用登録をする際に氏名，メールアドレスなどの個人情報をお尋ねすることがあります。
            </ArticleText>
        </Box>

        <Box>
          <Article>第3条（個人情報を収集・利用する目的）</Article>
          <ArticleText>
            <Text mb="10px">当社が個人情報を収集・利用する目的は，以下のとおりです。</Text>
            <ParentUnorderedList>
              <ListItem>
              当社サービスの提供・運営のため
              </ListItem>
              <ListItem>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</ListItem>
              <ListItem>
                ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため
              </ListItem>
              <ListItem>
                利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
              </ListItem>
              <ListItem>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</ListItem>
              <ListItem>ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</ListItem>
              <ListItem>上記の利用目的に付随する目的</ListItem>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第4条（利用目的の変更）</Article>
          <ArticleText>
            <ParentUnorderedList>
              <ListItem>
                当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
              </ListItem>
              <ListItem>
                利用目的の変更を行った場合には，変更後の目的について，当社所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
              </ListItem>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第5条（個人情報の第三者提供）</Article>
          <ArticleText>
            <ParentUnorderedList>
              <ListItem>
                当社は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
              </ListItem>
              <ChildUnorderedList>
                <ListItem>
                  人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき
                </ListItem>
                <ListItem>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                </ListItem>
                <ListItem>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき
                </ListItem>
                <ListItem>予め次の事項を告知あるいは公表し，かつ当社が個人情報保護委員会に届出をしたとき</ListItem>
                  <GrandChildUnorderedList>
                  <ListItem>利用目的に第三者への提供を含むこと</ListItem>
                  <ListItem>第三者に提供されるデータの項目</ListItem>
                  <ListItem>第三者への提供の手段または方法</ListItem>
                  <ListItem>本人の求めに応じて個人情報の第三者への提供を停止すること</ListItem>
                  <ListItem>本人の求めを受け付ける方法</ListItem>
                </GrandChildUnorderedList>
                <ListItem>
                  前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
                </ListItem>
                  <GrandChildUnorderedList>
                  <ListItem>当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</ListItem>
                  <ListItem>合併その他の事由による事業の承継に伴って個人情報が提供される場合</ListItem>
                  <ListItem>
                    個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合
                  </ListItem>
                </GrandChildUnorderedList>
              </ChildUnorderedList>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第6条（個人情報の開示）</Article>
          <ArticleText>
            <ParentUnorderedList>
              <ListItem>
                当社は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。
              </ListItem>
              <ChildUnorderedList>
                <ListItem>本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</ListItem>
                <ListItem>当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合</ListItem>
                <ListItem>その他法令に違反することとなる場合</ListItem>
                <ListItem>自殺、自傷行為、薬物乱用を誘引または助長する表現</ListItem>
              </ChildUnorderedList>
              <ListItem>
                前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
              </ListItem>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第7条（個人情報の訂正および削除）</Article>
          <ArticleText>
            <ParentUnorderedList>
              <ListItem>
                ユーザーは，当社の保有する自己の個人情報が誤った情報である場合には，当社が定める手続きにより，当社に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。
              </ListItem>
              <ListItem>
                当社は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。。
              </ListItem>
              <ListItem>
                当社は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
              </ListItem>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第8条（個人情報の利用停止等）</Article>
          <ArticleText>
            <ParentUnorderedList>
              <ListItem>
                当社は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
              </ListItem>
              <ListItem>
                前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
              </ListItem>
              <ListItem>
                当社は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
              </ListItem>
              <ListItem>
                前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
              </ListItem>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第9条（プライバシーポリシーの変更）</Article>
          <ArticleText>
            <ParentUnorderedList>
              <ListItem>
                本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
              </ListItem>
              <ListItem>
                当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
              </ListItem>
            </ParentUnorderedList>
          </ArticleText>
        </Box>

        <Box>
          <Article>第10条（お問い合わせ窓口）</Article>
          <ArticleText>
            <Text my="15px">
              本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
            </Text>
            <ChakraLink as={ReactRouterLink} to='/home' color="#0987A0">
              お問い合わせページへ
            </ChakraLink>
            </ArticleText>
        </Box>

        <Box>
          <Text fontSize="sm">以上</Text>
        </Box>

      </VStack>
    </Box>
  )
};