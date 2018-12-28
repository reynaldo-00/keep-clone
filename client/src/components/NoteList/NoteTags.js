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
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
`

const TagContainer = styled.div`
    font-weight: 16px;
    height: 25px;
    border: 1px solid rgba(0,0,0,0.54);
    border-radius: 8px;
    text-align: center;
    line-height: 25px;
    padding: 0px 5px;
`
