import React, {useState,useContext, useEffect} from 'react'
import {Segment, Form, Button,Grid} from 'semantic-ui-react'
import {ActivityFormValues } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { category } from '../../../app/common/options/categoryOptions';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import {combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate';

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    catgory: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(8)({message:'Description should be at least 9 characters'}),
    )(),
    city: isRequired('City') ,
    venue: isRequired('Venue'),
    date: isRequired('Date') ,
    time: isRequired('time') ,   
})

interface DetailParams{
    id: string;
}


const ActivityForm: React.FC <RouteComponentProps<DetailParams>>= ({match, history}) => {
    
    const activityStore = useContext(ActivityStore)  ;  
    const {createActivity,editActivity,submitting, loadActivity} = activityStore;
    
    

    
    const [activity,setActivity] = useState(new ActivityFormValues());

    useEffect(() => {
        if(match.params.id){
            loadActivity(match.params.id)
            .then((activity) => setActivity(new ActivityFormValues(activity)));
        }

        // return () =>{
        //     clearActivity()
        // }
    }, [loadActivity,match.params.id]);

    

    const handleFinalFormSubmit = (values: any) =>{
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime
        
            if (!activity.id) {
                let newActivity = {
                    ...activity,
                    id: uuid()
                };
                createActivity(newActivity);
            } else {
                editActivity(activity);
            }
    }
    
     
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues = {activity}
                        onSubmit ={handleFinalFormSubmit}
                        render = {({handleSubmit,invalid,pristine}) =>(
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder='Description'
                                    rows={3}
                                    value={activity.description}
                                    component={TextAreaInput}
                                />
                                <Field
                                    name='category'
                                    options={category}
                                    placeholder='Category'
                                    value={activity.category}
                                    component={SelectInput}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        name='date'
                                        placeholder='Date'
                                        value={activity.date}
                                        component={DateInput}
                                        date={true}
                                    />

                                    <Field
                                        name='time'
                                        placeholder='Time'
                                        value={activity.time}
                                        component={DateInput}
                                        time={true}
                                    />
                                </Form.Group>

                                <Field
                                    name='city'
                                    placeholder='City'
                                    value={activity.city}
                                    component={TextInput}
                                />
                                <Field
                                    component={TextInput}
                                    name='venue'
                                    placeholder='Venue'
                                    value={activity.venue}
                                />

                                <Button 
                                loading={submitting} 
                                floated='right' 
                                positive 
                                type='submit' 
                                content='Submit' />
                                <Button onClick={activity.id
                                    ? () => history.push(`/activities/${activity.id}`)
                                    : () => history.push('/activities/')} floated='right' type='button' content='Cancel' />
                            </Form>
                        )}
                    />
                    
                </Segment>
            </Grid.Column>
        </Grid>

        
    )
}

export default observer (ActivityForm);
