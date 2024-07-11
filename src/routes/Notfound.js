import { Helmet } from "react-helmet-async";

export const Notfound = () => {
  return (
    <>
      <Helmet>
          <title>Not Found - Rate Footballer</title>
      </Helmet>

      <div>
        <p>ページが存在しません</p>
      </div>
    </>
  )
}