export function currencyFormatter(number: any) {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency: 'MXN'
    });
    return formatter.format(number);
  }