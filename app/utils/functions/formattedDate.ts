export default function formattedDate(date: string): string {
  if (typeof date !== 'string') return ''
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
