import { DayjsDateProvider } from './implementations/dayjs-date-provider';
import { IDateProvider } from './interface-date-provider';

export function DateProvider(): IDateProvider {
  return new DayjsDateProvider();
}
