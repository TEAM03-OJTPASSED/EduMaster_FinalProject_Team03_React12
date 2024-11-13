export const moneyFormatter = (value: number | undefined) => {
    if (value == undefined) return "$ 0.00";
    return `$ ${Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };