export default function ErrorDisplay({ text }) {
  return (
    <>
      {text === "" ? null : (
        <div>
          <h1>{text}</h1>
        </div>
      )}
      <style jsx>
        {`
          div {
            text-align: center;
            margin: 10px 0;
            padding: 5px;
            border: 3px solid red;
            width: 100%;
            color: red;
            font-size: 14px;
            border-radius: 5px;
          }
          h1 {
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
