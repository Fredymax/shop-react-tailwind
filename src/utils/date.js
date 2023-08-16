export function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a valid Date object.')
  }

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const amPm = hours >= 12 ? 'pm' : 'am'
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedDate = `${formattedHours}:${formattedMinutes}${amPm} ${String(
    date.getDate(),
  ).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${date.getFullYear()}`

  return formattedDate
}
