import fs from 'fs';
import path from 'path';
import { Paths } from '../constants/paths';

export class Logger {
  private static readonly logFile = Paths.logsFile;

  static {
    // Ensure log directory exists
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private static log(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;
    
    // Write to console
    console.log(formattedMessage);
    
    // Append to file
    try {
      fs.appendFileSync(this.logFile, formattedMessage + '\n', 'utf-8');
    } catch (e) {
      console.error(`Logger failed to write to file: ${(e as Error).message}`);
    }
  }

  public static info(message: string): void {
    this.log('INFO', message);
  }

  public static warn(message: string): void {
    this.log('WARN', message);
  }

  public static error(message: string, error?: unknown): void {
    let errMsg = message;
    if (error) {
      errMsg += ` | Error: ${error instanceof Error ? error.message : String(error)}`;
      if (error instanceof Error && error.stack) {
        errMsg += `\nStacktrace:\n${error.stack}`;
      }
    }
    this.log('ERROR', errMsg);
  }

  public static debug(message: string): void {
    this.log('DEBUG', message);
  }
}
export default Logger;
