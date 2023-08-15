export function maxlengText(val) {
  if (val?.length < 70) {
    return val;
  } else {
    return val?.substring(0, 67) + 'Xem thêm...';
  }
}
export function money(val) {
  return Number(val).toLocaleString('vi-VN');
}
export function date(val) {
  return new Date(val).toLocaleString('vi-VN');
}
export function formatCurrency(val) {
  let value = Number(val);
  if (value >= 1000000000) {
    return (
      (value / 1000000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + 'tỷ'
    );
  } else if (value >= 1000000) {
    return (
      (value / 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + 'tr'
    );
  } else if (value >= 1000) {
    return (
      (value / 1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + 'nghìn'
    );
  } else if (val == 0) {
    return ' ';
  }
}
