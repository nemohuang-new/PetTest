import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/order">
      Order
    </MenuItem>
    <MenuItem icon="asterisk" to="/tag">
      Tag
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      Category
    </MenuItem>
    <MenuItem icon="asterisk" to="/api-response">
      Api Response
    </MenuItem>
    <MenuItem icon="asterisk" to="/pet">
      Pet
    </MenuItem>
    <MenuItem icon="asterisk" to="/photo-url">
      Photo Url
    </MenuItem>
    <MenuItem icon="asterisk" to="/pet-inventory">
      Pet Inventory
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
