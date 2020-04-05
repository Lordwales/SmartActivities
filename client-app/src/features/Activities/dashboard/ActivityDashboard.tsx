import React from 'react'
import { Grid} from 'semantic-ui-react';
import {IActivity} from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps{
    activities: IActivity []
    selectActivity: (id:string)=>void;
    selectedActivity:IActivity | null
    editMode:boolean;
    setEditMode: (editMode:boolean) =>void;
    setSelectedActivity:(activity:IActivity|null)=>void;
    createActivity:(activity:IActivity)=>void;
    EditActivity:(activity:IActivity)=>void
    deleteActivity: (id:string)=>void;
}
const ActivityDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    EditActivity,
    deleteActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
                {/* <List>
                    {activities.map((activity)=>(
                        // <li key={weatherforecast.date}>{weatherforecast.summary}</li>  
                            <List.Item key={activity.id}>{activity.title}</List.Item> 
                        ))}
                </List>   */}
            </Grid.Column> 

            <Grid.Column width={6}>
                {selectedActivity && !editMode&&(<ActivityDetails
                 activity={selectedActivity}
                 setEditMode={setEditMode}
                  setSelectedActivity={setSelectedActivity}/>)}

                {editMode && 
                <ActivityForm 
                key ={selectedActivity && selectedActivity.id || 0}
                setEditMode={setEditMode}
                 activity={selectedActivity!}
                 createActivity={createActivity}
                 EditActivity = {EditActivity}
                 
                 ></ActivityForm> } 
                
            </Grid.Column>  
              
        </Grid>
    )
}

export default ActivityDashboard;
