import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import FatText from './FatText';
// import Button from './Button';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

const Card = styled.div`
    ${props => props.theme.whiteBox}
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const ExtendAvatar = styled(Avatar)`
    margin-bottom: 15px;
`;

const ExtendLink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;

const UserCard = ({ id, userName, isFollowing, url, isSelf }) => (
    <Card>
        <ExtendAvatar url={url} size={"md"} />
        <ExtendLink to={`/${userName}`}>
            <FatText text={userName} />
        </ExtendLink>
        {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
    </Card>
);

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    isSelf: PropTypes.bool.isRequired,
};

export default UserCard;