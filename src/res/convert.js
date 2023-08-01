export function maxlengText(val) {
  if (val?.length < 70) {
    return val;
  } else {
    return val?.substring(0, 67) + 'Xem thêm...';
  }
}
