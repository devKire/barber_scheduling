type DecimalLike = {
  toString(): string;
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function toNumber(value: DecimalLike | number | string) {
  if (typeof value === 'number') {
    return value;
  }

  return Number(value.toString());
}

export function formatCurrency(value: DecimalLike | number | string) {
  return currencyFormatter.format(toNumber(value));
}
