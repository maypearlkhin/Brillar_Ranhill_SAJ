export function formatWithThousandsSeparator(value: string): string {
  const [integerPart, decimalPart] = value.split(".");
  const formattedInteger = (integerPart ?? "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
