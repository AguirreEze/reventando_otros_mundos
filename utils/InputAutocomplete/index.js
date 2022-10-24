export default function InputAutocomplete({ id, list }) {
  return (
    <datalist id={id}>
      {list.map((genre) => (
        <option key={genre} value={genre} />
      ))}
    </datalist>
  )
}
