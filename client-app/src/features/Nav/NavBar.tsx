import React, { useContext } from 'react'
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootstore';


const NavBar: React.FC= () => {
  const rootStore = useContext(RootStoreContext);
  const {logout, user} = rootStore.userStore;
    return (
      <Menu fixed = 'top' inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to='/' >
            <img src="/assets/logo192.png" alt= "logo"  style={{marginRight:'10px'}}/>
            Smartactivities
          </Menu.Item>
          <Menu.Item name='Activities' as={NavLink} exact to='/activities'/>
          <Menu.Item >
            <Button as={NavLink} exact to='/createActivity' positive content='Create Activity'/>
          </Menu.Item>
          {user &&
            <Menu.Item position='right'>
              <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
              <Dropdown pointing='top left' text={user.username}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user' />
                  <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          }
        </Container>
          
      </Menu>
    );
}

export default observer (NavBar);
