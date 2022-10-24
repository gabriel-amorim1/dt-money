export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const stringDateFormatter = (date: string) => {
  const [year, month, day] = date.split('-')

  return day + '/' + month + '/' + year
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
