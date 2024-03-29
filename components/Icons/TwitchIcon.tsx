export default function TwitchIcon(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <rect width={512} height={512} rx="15%" fill="#6441a4" />
      <path
        d="m115 101-22 56v228h78v42h44l41-42h63l85-85V101zm260 185-48 48h-78l-42 42v-42h-65V130h233zm-48-100v85h-30v-85zm-78 0v85h-29v-85z"
        fill="#fff"
      />
    </svg>
  )
}
