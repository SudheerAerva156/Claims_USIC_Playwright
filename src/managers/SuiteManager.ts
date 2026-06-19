import { Tags } from '../constants/tags';

export class SuiteManager {
  /**
   * Returns standard grep pattern for a suite name.
   */
  public static getGrepForSuite(suiteName: string): RegExp {
    switch (suiteName.toLowerCase()) {
      case 'smoke':
        return new RegExp(Tags.SMOKE);
      case 'upgrade-base-capability':
        return new RegExp(Tags.BASE_CAPABILITY);
      case 'upgrade-base-defects':
        return new RegExp(Tags.BASE_DEFECT);
      case 'regression':
        return new RegExp(Tags.REGRESSION);
      case 'recent-tickets':
        return new RegExp(Tags.RECENT_TICKETS);
      case 'cr':
      case 'change-requests':
        return new RegExp(Tags.CHANGE_REQUEST);
      case 'incidents':
        return new RegExp(Tags.INCIDENT);
      case 'high-priority-defects':
        return new RegExp(Tags.HIGH_PRIORITY_DEFECT);
      case 'reused-upgrade':
        return new RegExp(Tags.REUSED_UPGRADE);
      default:
        return /.*/;
    }
  }
}
export default SuiteManager;
