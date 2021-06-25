import { WinnerData } from "../interfaces/local-types";


export const processWinnerData = (detailedWinnersV1: WinnerData[], detailedWinnersV3: WinnerData[], detailedWinnersPoly: WinnerData[]) => {
  const totalDetailWinners = [...detailedWinnersV1, ...detailedWinnersV3, ...detailedWinnersPoly]
  return totalDetailWinners.sort((x, y) => (x.odds < y.odds) ? 1 : ((y.odds < x.odds) ? -1 : 0)).slice(0, 10);
}