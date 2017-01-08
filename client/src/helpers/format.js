/**
 * Format a file size number.
 */
export const formatFileSize = (length) => {   // eslint-disable-line
  if (length === 0) {
    return 0;
  }
  const i = Math.floor(Math.log(length) / Math.log(1024));
  return ((length / Math.pow(1024, i)).toFixed(2) * 1) + ' ' +  // eslint-disable-line
    ['B', 'kB', 'MB', 'GB', 'TB'][i];
};
