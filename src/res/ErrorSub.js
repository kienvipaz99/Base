const ErrorSub = {
  'The account holder field is required.': [
    'Trường tên chủ tài khoản là bắt buộc.',
  ],
  'The account number field is required.': ['Trường số tài khoản là bắt buộc.'],
  'The branch field is required.': ['Trường chi nhánh là bắt buộc.'],

  'The name bank field is required.': ['Trường ngân hàng là bắt buộc.'],
  'The email field is required.': 'Trường email là bắt buộc',
  'The first name field is required.': 'Trường họ và tên đệm là bắt buộc',
  'The last name field is required.': 'Trường tên là bắt buộc',
  'The password field is required.': 'Mật khẩu là bắt buộc',
  'The email must be a valid email address.': 'Địa chỉ email không hợp lệ',
  'The password must be at least 8 characters.':
    'Mật khẩu phải có ít nhất 8 kí tự',
  'The password confirmation does not match.':
    'Xác nhận mật khẩu không trùng khớp',
  'The his field is required.': 'Trường mã máy là bắt buộc',
  'The name field is required.': 'Tên là bắt buộc',
  'The slug has already been taken.': 'Tên đã tồn tại',
  'The prefix key has already been taken.': 'Khoá đã tồn tại',
  'The prefix key field is required.': 'Mã sản phẩm là bắt buộc',
  'The tag has already been taken.': 'Tên đã được sử dụng',
  'The invoice period must be at least 1.': 'Thời hạn ít nhất là 30',
};
export function ErrorSubs(val) {
  return ErrorSub[val] || '';
}
