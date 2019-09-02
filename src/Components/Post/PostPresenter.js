import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { 
    HeartFull, 
    HeartEmpty, 
    Comment, 
    User,
    Prev,
    Next,
} from '../Icons';

const Post = styled.div`
    ${props => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.img`
    max-width: 100%;
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.showing ? 1 : 0)};
    transition: opacity 0.5s linear;
`;

const SlideButton = styled.div`
    cursor: pointer;
    position: absolute;
    top: 50%;
    ${props => (props.type === "prev" ? "left: 10px" : "right: 10px")};
    opacity: 0.7;
`;

const Button = styled.span`
    cursor: pointer;
`;

const Meta = styled.div`
    padding: 15px;
`;

const Buttons = styled.div`
    ${Button} {
        &: first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const TimeStamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

export default ({
    user: { userName, avatar },
    location,
    files,
    isLiked,
    likeCount,
    createdAt,
    newComment,
    currentItem,
    slidePrev,
    slideNext,
}) => (
    <Post>
        <Header>
            <Avatar size='sm' url={avatar} />
            <UserColumn>
                <FatText text={userName} />
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            {files &&
                files.map((file, index) =>
                    <File key={file.id} src={file.url} showing={index === currentItem} />
                )}
            {files && 
                files.length > 1 && (
                    <>
                        <SlideButton type="prev" onClick={slidePrev}>
                            <Prev />
                        </SlideButton>
                        <SlideButton type="next" onClick={slideNext}>
                            <Next />
                        </SlideButton>
                    </>
                )}
        </Files>
        <Meta>
            <Buttons>
                <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
                <Button>
                    <Comment />
                </Button>
            </Buttons>
            <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
            <TimeStamp>{createdAt}</TimeStamp>
            <Textarea placeholder={"Add a Comment..."} {...newComment}></Textarea>
        </Meta>
    </Post>
);