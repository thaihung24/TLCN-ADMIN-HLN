const formatVNDC = (price) => {
  return Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export default formatVNDC
