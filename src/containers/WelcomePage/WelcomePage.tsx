import React from 'react'
import Grid from '@material-ui/core/Grid'
import InfoBar from '@components/InfoBar/InfoBar'
import { useSelector, useDispatch } from 'react-redux'
import providerSelectors from '@selectors/providers'
import signerSelectors from '@selectors/signer'
import { actions as providerActions } from '@reducers/provider'
import EventsHandlers from '@containers/EventsHandlers'
import { Status } from '@reducers/signer'
import PageSkeleton from '@components/PageSkeleton/PageSkeleton'
import Header from '@containers/HeaderWrapper/HeaderWrapper'
import useStyles from './style'

const WelcomePage: React.FC = () => {
  const classes = useStyles()
  const initialized = useSelector(providerSelectors.status)
  const message = useSelector(providerSelectors.message)
  const signerStatus = useSelector(signerSelectors.status)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(providerActions.initProvider())
  }, [dispatch])

  return (
    <Grid container direction='column' className={classes.background}>
      <Grid item>
        <InfoBar message={message} initialized={initialized} />
      </Grid>
      <Grid item className={classes.spacing40}>
        <Header />
      </Grid>
      <Grid item>
        <Grid container className={classes.contentContainer} justify='center'>
          <Grid item xs={12} className={classes.contentWrapper}>
            {signerStatus === Status.Initalized ? <></> : <PageSkeleton />}
          </Grid>
        </Grid>
      </Grid>
      {signerStatus === Status.Initalized && <EventsHandlers />}
    </Grid>
  )
}

export default WelcomePage
