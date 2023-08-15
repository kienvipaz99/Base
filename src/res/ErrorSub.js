const ErrorSub = {
  'The account holder field is required.': [
    'Trường tên chủ tài khoản là bắt buộc.',
  ],
  'The account number field is required.': ['Trường số tài khoản là bắt buộc.'],
  'The branch field is required.': ['Trường chi nhánh là bắt buộc.'],

  'The name bank field is required.': ['Trường ngân hàng là bắt buộc.'],
};
export function ErrorSubs(val) {
  return ErrorSub[val] || '';
}
