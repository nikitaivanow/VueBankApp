const formatter = new Intl.NumberFormat('ru-Ru', {currency: 'RUB', style: 'currency'})


export function currency(value){
  return formatter.format(value)
}