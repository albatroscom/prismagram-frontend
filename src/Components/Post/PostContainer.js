import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';

const PostContainer = ({ 
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location, 
    }) => {
        const [isLikedS, setIsLiked] = useState(isLiked);
        const [likeCountS, setLikeCount] = useState(likeCount);
        const [currentItem, setCurrentItem] = useState(0);
        const comment = useInput('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // const slide = () => {
        //     const totalFiles = files.length;
        //     if (currentItem === totalFiles - 1) {
        //         setTimeout(() => setCurrentItem(0), 3000);
        //     } else {
        //         setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        //     }
        // };
        // useEffect(() => {
        //     slide();
        // }, [currentItem, slide]);
        const slidePrev = () => {
            const totalFiles = files.length;
            if (currentItem === 0) {
                setCurrentItem(totalFiles - 1);
            } else {
                setCurrentItem(currentItem - 1);
            }
        };
        const slideNext = () => {
            const totalFiles = files.length;
            if (currentItem === totalFiles - 1) {
                setCurrentItem(0);
            } else {
                setCurrentItem(currentItem + 1);
            }
        };
        return (
            <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            slideNext={slideNext}
            slidePrev={slidePrev}
            />
        );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                userName: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
};

export default PostContainer;