export class DateUtil {
  /**
   * Returns a standard formatted string: YYYYMMDD_HHMMSS
   */
  public static getFormattedTimestamp(date: Date = new Date()): string {
    const pad = (num: number) => String(num).padStart(2, '0');
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mi = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    
    return `${yyyy}${mm}${dd}_${hh}${mi}${ss}`;
  }
}
export default DateUtil;
