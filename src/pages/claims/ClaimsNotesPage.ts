import { BasePage } from '../../base/BasePage';
import { Logger } from '../../utils/Logger';

export class ClaimsNotesPage extends BasePage {
  /**
   * Appends notes/comments to the claim.
   */
  public async addNote(noteText: string): Promise<void> {
    Logger.info(`Adding claims log note: '${noteText}'`);
    await this.click('claims.notes.notesBtn');
    await this.fill('claims.notes.noteInput', noteText);
    await this.click('claims.notes.addNoteBtn');
  }
}
export default ClaimsNotesPage;
