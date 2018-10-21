import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/store';
import styled from 'styled-components';

interface PropTypes {
  user?: firebase.User;
}

const StyledHeader = styled.header`
  padding: 8px;

  h1 {
    margin: 0;
  }

  p {
    text-align: center;
    color: gray;
  }
  
  a {
    width: 100%;
    display: block;
    text-align: center;
  }

  img {
    max-width: 260px;
    margin: auto;
  }
`;

const Header: React.SFC<PropTypes> = ({user}) => {
  return (
    <StyledHeader>
      <h1>
        <Link to='/'>
          <img src={require('../logo.svg')} alt="8ちゃんねる" />
        </Link>
      </h1>
      <p>Cloud Firestore & Firebase Authentication example</p>
    </StyledHeader>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Header);
