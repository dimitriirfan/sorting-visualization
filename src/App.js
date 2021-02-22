import React, { useEffect, useState } from 'react'
import Block from './Block'
import styled, { css } from 'styled-components'
import Legend from './Legend'

const App = () => {
  const MIN = 50
  const MAX = 250
  const [length, setLength] = useState(15)
  const [values, setValues] = useState(Array.from({length: length}, () => Math.floor(Math.random() * (MAX - MIN) + MIN)))
  const [visObject, setVisObject] = useState([])
  const [visBlocks, setVisBlocks] = useState([])
  const [isUsed, setIsUsed] = useState(false)
  const [algorithm, setAlgorithm] = useState("selection")

  const generateNumber = () => {
    setValues(Array.from({length: length}, () => Math.floor(Math.random() * (MAX - MIN) + MIN)))
    let objects = []
    values.forEach((item, i) => {
      objects.push(
        {
          height: item, 
          isRoot: false,
          isAccessed: false,
          isMinimum: false,
        }
      )
    })
    setVisObject(objects)
  }
  const draw = () => {
    let blocks = []
    visObject.forEach((item, i) => {
      blocks.push(
        <Block 
          key={i} 
          height={item.height} 
          isAccessed={item.isAccessed} 
          isRoot={item.isRoot}
          isMinimum={item.isMinimum}
        />
      )
    })
    setVisBlocks(blocks)
  }

  const insertionSort = async () => {
    let object = [...visObject]
    let j
    let root 
    setIsUsed(true)
    for (let i = 1; i < length; i++) {
      root = object[i].height
      object[i].isRoot = true
      j = i - 1
      while (j >= 0 && object[j].height > root) {
        object[j + 1].height = object[j].height
        object[j].isMinimum = true
        draw()
        await sleep(150)
        object[j].isMinimum = false
        j = j - 1 


      }
      object[j + 1].height = root
      setVisObject(object)
      await sleep(150)
      object[i].isRoot = false

    }
    setIsUsed(false)
    setVisObject(object)
    await sleep(500)
    generateNumber()

  }


  const selectionSort = async () => {
    let temp 
    let object = [...visObject]
    setIsUsed(true)
    for (let i = 0; i < length - 1; i++) {
      let min_idx = i
      object[i].isRoot = true
      object[min_idx].isMinimum = true
      for (let j = i; j < length; j++) {
        object[j].isAccessed = true
        if (object[j].height < object[min_idx].height) {
          object[min_idx].isMinimum = false
          object[j].isMinimum = true
          min_idx = j
        }
        draw()
        await sleep(150)
        setVisObject(object)
        object[j].isAccessed = false
      }
      object[min_idx].isMinimum = false
      await sleep(100)
      object[i].isRoot = false
      
      temp = object[i].height
      object[i].height = object[min_idx].height
      object[min_idx].height = temp
    }
    setVisObject(object) 
    setIsUsed(false)
    await sleep(500)
    generateNumber()
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {
    draw()
    console.log("pass...")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visObject]) 

  useEffect(() => {
    generateNumber()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Container flexDirection='row'>
      <Typography variant='title'>Sort Visualization</Typography>
      <Typography variant='subtitle'>
        {
          algorithm === 'selection' && <>Selection sort ascending algorithm</>
        }
        {
          algorithm === 'insertion' && <>Insertion sort ascending algorithm</>
        }
      </Typography>
      <Canvas>
        {visBlocks}
      </Canvas>
      <Content>
        {
          algorithm === 'selection' && <>
            <p>Selection sort is a simple sorting algorithm. This sorting algorithm is an in-place comparison-based algorithm in which the list is divided into two parts, 
              the sorted part at the left end and the unsorted part at the right end. Initially, the sorted part is empty and the unsorted part is the entire list.
            </p>
            <p>The smallest element is selected from the unsorted array and swapped with the leftmost element, 
              and that element becomes a part of the sorted array. This process continues moving unsorted array boundary by one element to the right.
            </p>
            <p>This algorithm is not suitable for large data sets as its average and worst case complexities are of Ο(n2), where n is the number of items.
            </p>
          </>
        }

        {
          algorithm === 'insertion' && <>
            <p>This is an in-place comparison-based sorting algorithm. Here, a sub-list is maintained which is always sorted. For example, the lower part of an array is maintained to be sorted. 
              An element which is to be 'insert'ed in this sorted sub-list, has to find its appropriate place and then it has to be inserted there. Hence the name, insertion sort.
            </p>
            <p>The array is searched sequentially and unsorted items are moved and inserted into the sorted sub-list (in the same array). 
              This algorithm is not suitable for large data sets as its average and worst case complexity are of Ο(n2), where n is the number of items.
            </p>
          </>
        }
      </Content>
      <ContainerBottom>
        <LegendGroup>
          <Legend color='#05445E' label="root"/>
          <Legend color='#56B66B' label="minimum"/>
          <Legend color='#75E6DA' label="acceessed"/>
        </LegendGroup>
        <ButtonGroup>
          <Button onClick={generateNumber}>Generate</Button>
          <Button 
            onClick={e => selectionSort() && setAlgorithm("selection")} 
            disabled={
              visObject.length === 0 || isUsed ? true : false
            }
            >
              Selection Sort
          </Button>
          <Button 
            onClick={e => insertionSort() && setAlgorithm("insertion")} 
            disabled={
              visObject.length === 0 || isUsed ? true : false
            }
            >
              Insertion Sort
          </Button>
        </ButtonGroup>
      </ContainerBottom>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  max-width: 1024px;
  border: 2px solid #131313;
  padding: 1em;
  margin-top: 5em;
`

const Canvas = styled.div`
  display: flex;
  justify-content: center;
  padding: 86px 32px 32px 32px;
  min-height: 250px;
`

const Content = styled.div`
`
const ContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LegendGroup = styled.div`
  display: flex;
  align-items: center;
`
const ButtonGroup = styled.div`
  display: flex;
  align-self: flex-end;
`

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border: 1px solid #131313;
  padding: 0.5em 1.25em;
  margin-left: 0.5em;
  transition: background-color 0.25s ease-out;
  
  &:hover {

    background-color: #131313;
    color: white;
  }
`

const Typography = styled.h1` 
  padding: 0;
  margin: 0;
  ${props => props.variant === 'title' && css`
    font-size: 2.125rem;
  `}

  ${props => props.variant === 'subtitle' && css`
    font-size: 1.125rem;
    font-weight: 500;
  `}
`
const InputNumber = styled.input`

`
export default App
