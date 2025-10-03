import { LayoutServiceData } from '@sitecore-content-sdk/core/layout';
import { DataService } from '../services/data-service';

export const createDataService = (layoutData: LayoutServiceData): DataService => {
  const labelService = new DataService(layoutData);
  return labelService;
};
