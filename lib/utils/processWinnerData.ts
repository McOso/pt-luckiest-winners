import { WinnerData } from "../interfaces/local-types";


export const processWinnerData = (detailedWinners: WinnerData[]) => {
  return detailedWinners.sort((x, y) => (x.odds < y.odds) ? 1 : ((y.odds < x.odds) ? -1 : 0)).slice(0, 10);
}