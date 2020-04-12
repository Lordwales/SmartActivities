import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {NavLink } from 'react-router-dom';


const NavBar: React.FC= () => {
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
        </Container>
          
      </Menu>
    );
}

export default observer (NavBar);
