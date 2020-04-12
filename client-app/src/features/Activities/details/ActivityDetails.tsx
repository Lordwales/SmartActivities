import React, { useContext, useEffect } from 'react'
import {Grid } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParams{
    id:string
}

const ActivityDetails: React.FC <RouteComponentProps <DetailParams>>= ({match}) => {
    const activityStore = useContext(ActivityStore)
    const {activity,loadActivity, loadingInitial,} = activityStore;


    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id]);

    if (loadingInitial || !activity ) return <LoadingComponents content = 'loading activity...'/>
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column> 
        </Grid>
    )
}

export default observer (ActivityDetails);
