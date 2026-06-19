import fs from 'fs';
import path from 'path';
import { Logger } from './Logger';

export class FileSystemUtil {
  /**
   * Safely serializes and saves an object to a target JSON file path.
   */
  public static writeJson(filePath: string, data: any): void {
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      Logger.error(`Failed to write JSON file at: ${filePath}`, e);
    }
  }

  /**
   * Reads and parses a target JSON file. Returns null on failure or if file doesn't exist.
   */
  public static readJson<T>(filePath: string): T | null {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content) as T;
      }
    } catch (e) {
      Logger.error(`Failed to read JSON file at: ${filePath}`, e);
    }
    return null;
  }
}
export default FileSystemUtil;
