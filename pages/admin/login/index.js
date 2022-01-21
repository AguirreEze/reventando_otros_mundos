import useField from "hooks/useField"

export default function Login() {
  const username = useField({ type: "text" })
  const password = useField({ type: "password" })
  return (
    <form>
      <div>
        <label name="username">username:</label>
        <input {...username.input} placeholder="Username" name="username" />
      </div>
      <div>
        <label name="password">password:</label>
        <input {...password.input} placeholder="Password" name="password" />
      </div>
      <button>Login</button>
    </form>
  )
}
