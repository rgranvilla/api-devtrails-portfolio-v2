import { IDateProvider } from '@core/providers/date-provider/IDateProvider';

import { DayjsDateProvider } from './implementations/dayjsDateProvider';

export function DateProvider(): IDateProvider {
  return new DayjsDateProvider();
}
