export function isRequired(str = '' | undefined) {
  if (str !== null) {
    return !(str.trim().length === 0);
  }
  return false;
}
function isValidEmail(email) {
  // Sử dụng biểu thức chính quy để kiểm tra địa chỉ email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function checkEmail(email) {
  if (!email || email.trim() === '') {
    errors.email = 'Vui lòng nhập địa chỉ email';
  } else if (!isValidEmail(inputs.email)) {
    errors.email = 'Địa chỉ email không hợp lệ';
  }
}
export function validateInputFields(inputs) {
  const errors = {};

  // Kiểm tra trường nhập email
  if (!inputs.email || inputs.email.trim() === '') {
    errors.email = 'Vui lòng nhập tài khoản';
  }
  // Kiểm tra trường nhập mật khẩu
  if (!inputs.password || inputs.password.trim() === '') {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (inputs.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }

  return errors;
}
export function validateService(inputs) {
  const errors = {};
  if (!inputs.price || inputs.price.trim() === '') {
    errors.price = 'Vui lòng nhập giá';
  } else {
    errors.price = '';
  }
  if (
    inputs.invoice_period !== undefined &&
    (isNaN(inputs.invoice_period) || inputs.invoice_period <= 30)
  ) {
    errors.invoice_period = 'Vui lòng nhập một số lớn hơn 30';
  } else {
    errors.invoice_period = '';
  }
  if (!inputs.name || inputs.name.trim() === '') {
    errors.name = 'Vui lòng nhập tên';
  } else {
    errors.name = '';
  }
  if (inputs.product_id !== undefined) {
    errors.product_id = 'Vui lòng chọn sản phẩm';
  } else {
    errors.product_id = '';
  }

  return errors;
}
