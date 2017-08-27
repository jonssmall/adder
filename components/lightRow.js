const buildRow = (row) => {
  return row.reduce((acc, r) => {
    return `${acc}<div class="${r ? 'light-switch' : 'light-switch on'}"></div>`;
  }, '');
};