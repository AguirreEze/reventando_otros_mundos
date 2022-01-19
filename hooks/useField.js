import { useState } from "react"

export default function useField({ type }) {
  const [value, setValue] = useState("")

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    input: {
      value,
      onChange,
      type,
    },
    reset,
  }
}
