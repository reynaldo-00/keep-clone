import React from 'react';
import styled from 'styled-components'

const NoteTags = ({tags}) => {
    return (
        <Container>
            {
                tags && tags.length && tags.map((tag, i) => {
                    return (
                        <TagContainer key={i}>
                            {tag}
                        </TagContainer>
                    );
                })
            }
        </Container>
    );
}

export default NoteTags;

const Container = styled.div`
    position: 'absolute';
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;
`

const TagContainer = styled.div`
    font-size: 12px;
    font-weight: 600;
    border: 1px solid rgba(0,0,0,0.54);
    border-radius: 8px;
    text-align: center;
    padding: 5px;
    margin: 5px;
`
