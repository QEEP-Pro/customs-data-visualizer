export default (num: number) => Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
