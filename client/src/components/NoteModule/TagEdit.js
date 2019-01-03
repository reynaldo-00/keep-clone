import React from 'react';
import styled from 'styled-components'

const TagEdit = ({tags}) => {
    return (
        <TagContainer>
        {
            tags && tags.map((tag, index) => {
                return (
                    <TagItem key={index}>
                        {tag}
                    </TagItem>
                );
            })
        }
            <TagItem>
                +
            </TagItem>
        </TagContainer>
    );
}

export default TagEdit;

const TagContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    /* background-color: rgba(255,0,0,0.1); */
`;

const TagItem = styled.span`
    padding: 6px 20px;
    border: solid 1px #ddd;
    border-radius: 12px;
    margin: 5px;
    cursor: pointer;
    user-select: none;
`;
