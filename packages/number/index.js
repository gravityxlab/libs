export const formatNumber = (number = 'en-US') => {
  return new Intl.NumberFormat(locale).format(number);
}
