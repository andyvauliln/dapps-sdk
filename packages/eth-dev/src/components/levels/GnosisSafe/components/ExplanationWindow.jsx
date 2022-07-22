import React, { useState, useEffect } from 'react'
import { Button, CodeContainer, MarkdownContainer, WindowModal } from '../../../gameItems/components'

const ExplanationWindow = ({ isOpen, continueDialog, setExplanationWindowVisibility }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const contentFileName = './overview/Detailed_LineByLine.md'
  const [fileContent, setFileContent] = useState('')

  useEffect(() => {
    import(`${contentFileName}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setFileContent(res))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <WindowModal
      initTop={10}
      initLeft={10}
      initHeight={window.innerHeight * 0.9}
      initWidth={window.innerWidth * 0.6}
      backgroundPath='./assets/items/window.png'
      dragAreaHeightPercent={12}
      windowTitle='Gnosis Safe'
      isOpen={isOpen}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      <div
        className='content'
        style={{
          float: 'left',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: '#161B22'
        }}
      >
        <div
          style={{
            marginTop: '1%',
            marginBottom: '5%',
            color: '#16DC8C',
            fontFamily: 'Roboto, Arial, Helvetica Neue, Helvetica, sans-serif',
            fontSize: 16,
            lineHeight: 1.6
          }}
        >

          <MarkdownContainer>
            {fileContent}
          </MarkdownContainer>

          <Button
            className='is-warning'
            onClick={() => {
              continueDialog()
              setCurrentStep(currentStep + 1)
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </WindowModal>
  )
}

export default ExplanationWindow
