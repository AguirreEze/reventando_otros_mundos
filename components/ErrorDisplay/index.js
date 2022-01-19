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
            border: 3px solid red;
            width: 100%;
            color: red;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
