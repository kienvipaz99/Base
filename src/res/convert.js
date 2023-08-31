export function maxlengText(val) {
  if (val?.length < 70) {
    return val;
  } else {
    if (val === null) {
      return '';
    } else {
      return val?.substring(0, 67) + '  Xem thêm...';
    }
  }
}
export function money(val) {
  if (val) {
    return Number(val).toLocaleString('vi-VN');
  } else {
    return 0;
  }
}
export function date(val) {
  if (val) {
    return new Date(val).toLocaleString('vi-VN');
  } else {
    return 'Không xác định';
  }
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
export function formatCurrencys(val) {
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
    return 0 + 'đ';
  }
}
export function getCurrentMonthDays() {
  // Lấy ngày hiện tại
  const today = new Date();
  // Lấy ngày cuối cùng của tháng hiện tại
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // Lấy ngày trong tháng cuối cùng
  return lastDayOfMonth.getDate();
}
export function getCurrentDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: Tháng bắt đầu từ 0
  const year = today.getFullYear();

  return {day, month, year};
}
export function chuyenChuoi(str) {
  // Chuyển toàn bộ ký tự thành chữ thường
  if (str) {
    const chuoiThap = str.toLowerCase();

    // Thay thế dấu cách bằng dấu gạch ngang
    const chuoiDaChuyen = chuoiThap.replace(/\s+/g, '-');

    return chuoiDaChuyen;
  } else {
    return '';
  }
}
export function ngaythang(date) {
  const utcTimestamp = new Date(date);

  const year = utcTimestamp.getUTCFullYear();
  const month = (utcTimestamp.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
  const day = utcTimestamp.getUTCDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
