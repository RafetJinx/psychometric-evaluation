import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserFullName } from '../../redux/actions/userActions'
import { clearState } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

function UserDropdown({ direction, ...args }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting userId from state
  const userId = useSelector(state => state.authReducer.userId);

  // getting userFullName from state
  const userFullName = useSelector((state) => state.userReducer.userFullName);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    dispatch(GetUserFullName(userId));
  }, [dispatch, userId]);

  const handleShowInformation = () => {
    navigate("/show-information");
  }

  const handleLogout = () => {
    dispatch(clearState());
    navigate("/");
  }

  return (
    <div className="d-flex p-5 justify-content-end">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret>{userFullName}</DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem header>Sayfalar</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleShowInformation}>Bilgileri Görüntüle</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleLogout}>Çıkış Yap</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

UserDropdown.propTypes = {
  direction: PropTypes.string,
};

export default UserDropdown;