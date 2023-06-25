import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'

const Portal = () => {
  const files = {}

  return <Sandpack template='react' />
}

export default Portal
