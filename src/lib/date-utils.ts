// lib/date-utils.ts
import { format } from 'date-fns';

export const formatGameTime = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'hh:mm a');
};