import React from 'react'
import styled, { css }from 'styled-components'

const Block = (props) => {
    return (
        <>  
            <BlockContainer 
                height={props.height} 
                isAccessed={props.isAccessed} 
                isRoot={props.isRoot}
                isMinimum={props.isMinimum}
            >
                {props.isMinimum && <Label type='min'>min</Label>}
                {props.isRoot && <Label type='root'>root</Label>}

            </BlockContainer>
        </>
    )
}

const BlockContainer = styled.div(props => ({
    position: 'relative',
    height: props.height,
    width: '50px',
    border: '1px solid #131313',
    transition: 'all 0.25s ease-out',
    margin: '0.25em',
    backgroundColor: props.isAccessed ? '#75E6DA' : (
        props.isRoot ? '#05445E' : props.isMinimum ? '#56B66B' : undefined
    )
}))

const Label = styled.p`
    ${props => props.type === 'min' && css`
        top: -35px;
    `}
    ${props => props.type === 'root' && css`
        top: -50px;
    `}
    position: absolute;
`
export default Block
