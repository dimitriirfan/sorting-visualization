import React from 'react'
import styled from 'styled-components'

const Legend = (props) => {
    return (
        <Container>
            <LegendColor color={props.color}/>
            <LegendLabel>{props.label}</LegendLabel>

        </Container>
    )
}

export default Legend

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
`
const LegendColor = styled.div(props => ({
    width: '25px',
    height: '25px',
    backgroundColor: props.color,
    marginRight: '10px',
    border: '1px solid #131313'

}))


const LegendLabel = styled.p``