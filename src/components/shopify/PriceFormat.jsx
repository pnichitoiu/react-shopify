export const PriceFormat = price => {
  return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'Lei' }).format(price);
}
