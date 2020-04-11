import React, { useEffect,Fragment,useContext } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard'
import NavBar from '../../features/Nav/NavBar';
import LoadingComponents from './LoadingComponents';
import ActivityStore from '../stores/activityStore';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/Activities/form/ActivityForm';
import ActivityDetails from '../../features/Activities/details/ActivityDetails';
import { observer } from 'mobx-react-lite';


const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);
  


  useEffect(()=>{
    activityStore.loadActivities(); 
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponents content ='Loading Activities...'/>
   
    return (
      <Fragment >
        <NavBar  />
        <Container style = {{marginTop:'7em'}} >
          <Route exact path='/' component={HomePage} />
          <Route exact path='/activities' component={ActivityDashboard} />
          <Route exact path='/activities/:id' component={ActivityDetails} />
          <Route key = {location.key} exact path={['/createActivity', '/manage/:id'] }component={ActivityForm} />
          
        </Container>
        
      </Fragment>
    );
 
  
}

export default withRouter(observer(App));
