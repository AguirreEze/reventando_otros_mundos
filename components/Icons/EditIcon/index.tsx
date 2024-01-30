export default function EditIcon(props: {
  className?: string
  onClick?: () => void
}) {
  return (
    <svg
      height={35}
      width={35}
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5-4 1 1-3.944 9.504-9.552a2.116 2.116 0 0 1 2.864-.125zM15.5 6.5l1 1" />
      </g>
    </svg>
  )
}
