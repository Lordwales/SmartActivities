import React, { useEffect, useContext,  } from 'react'
import { Grid} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { RootStoreContext } from '../../../app/stores/rootstore';


const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadActivities,loadingInitial} = rootStore.activityStore;
  


  useEffect(()=>{
    loadActivities(); 
  }, [loadActivities]);

  if (loadingInitial) return <LoadingComponents content ='Loading Activities...'/>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column> 

            <Grid.Column width={6}>
                <h2> Activity Filters </h2>
                
            </Grid.Column>  
              
        </Grid>
    )
}

export default observer (ActivityDashboard);
