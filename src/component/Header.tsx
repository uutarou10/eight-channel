import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/store';
import styled from 'styled-components';

interface PropTypes {
  user?: firebase.User;
}

const StyledHeader = styled.header`
  h1 {
    font-weight: 900;
    text-align: center;
    font-size: 35px;
  }

  h1 > a {
    color: #3963a8;
  }
`;

const Header: React.SFC<PropTypes> = ({user}) => {
  return (
    <StyledHeader>
      <h1><Link to='/'>８ちゃんねる</Link></h1>
      <p>{user ? `ようこそ、${user.displayName}さん` : '未ログイン'}</p>
    </StyledHeader>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Header);
