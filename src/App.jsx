import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Button } from './components/ui/button';
import CardTea from './components/blocks/CardTea';
import { AiFillHome } from "react-icons/ai";
import { Tile } from './components/ui/tile';
import Container from './components/ui/container';
import NavPane from './components/blocks/NavPane';

function App() {

  return (
      <ResizablePanelGroup className="" direction="horizontal">
        <ResizablePanel className="min-w-96 max-w-[34rem]">
          <NavPane/>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Container>
            <CardTea/>
            <CardTea/>
          </Container>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}

export default App
