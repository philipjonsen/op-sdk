import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';

export const getFormattedDate = (timestamp: number) =>
  format(fromUnixTime(timestamp), 'yyyy-MM-dd HH:mm:ss');

export const shorten = (str: string, len: number = 10) => {
  if (str.length < 10) return str;
  return `${str.slice(0, len)}...${str.slice(str.length - len)}`;
};
