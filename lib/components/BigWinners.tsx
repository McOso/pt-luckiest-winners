import React from 'react'
import { useDetailedPrizes } from '../hooks/useDetailedPrizes';
import { DisplayWinners } from './DisplayWinners';
import styles from '../../assets/styles/Home.module.css'
import { QUERY } from '../interfaces/local-types';

export const BigWinners = (props) => {
  const { mdata } = props

  const prizeDetailWrapperV1 = useDetailedPrizes(mdata.prizePoolsV1.data, QUERY.V1);
  const prizeDetailWrapperV3 = useDetailedPrizes(mdata.prizePoolsV3.data, QUERY.V3);
  const prizeDetailWrapperPoly = useDetailedPrizes(mdata.prizePoolsPoly.data, QUERY.POLY);

  return (
    <>
    {(prizeDetailWrapperV1.results.some(x => x.isError) || prizeDetailWrapperV3.results.some(x => x.isError) || prizeDetailWrapperPoly.results.some(x => x.isError))
      ? (<span className={styles.textWhite}>Error: Something went wrong with results..</span>) 
      : (prizeDetailWrapperV1.results.some(x => x.isLoading) || prizeDetailWrapperV3.results.some(x => x.isLoading) || prizeDetailWrapperPoly.results.some(x => x.isLoading))
      ? (
      <h4 className={styles.textWhite}>Loading..</h4>
    ) : <DisplayWinners wrapperv1={prizeDetailWrapperV1} wrapperv3={prizeDetailWrapperV3} wrapperpoly={prizeDetailWrapperPoly} />}
    </>
  )
}