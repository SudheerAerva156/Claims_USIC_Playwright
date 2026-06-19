import { BaseComponent } from '../../base/BaseComponent';

export class GridComponent extends BaseComponent {
  /**
   * Retrieves total rows count in the current grid.
   */
  public async getRowCount(): Promise<number> {
    return await this.getLocator('shared.grid.tableRows').count();
  }

  /**
   * Clicks target cell link inside a given row index.
   */
  public async clickRowLink(rowIndex: number): Promise<void> {
    await this.getLocator('shared.grid.tableRows').nth(rowIndex).locator('a').first().click();
  }
}
export default GridComponent;
