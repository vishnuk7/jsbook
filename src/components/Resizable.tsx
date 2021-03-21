import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';


interface ResizableProps {
    direction: 'horizontal'| 'vertical'
}

export const Resizable:React.FC<ResizableProps> = ({ direction, children })  => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.5);

  useEffect(()=>{
    let timer:any;
    const listener = () => {
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=> {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if(window.innerWidth < width){
          setWidth(window.innerWidth * 0.75);
        }

      },100);
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize',listener);
    }

  },[])

  if (direction === 'horizontal'){
    resizableProps = {
      className: 'resize-horizontal',
      width: width,
      height:Infinity,
      minConstraints:[innerWidth * 0.2, Infinity],
      maxConstraints:[innerWidth * 0.75, Infinity],
      resizeHandles:['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    }
  }else {
    resizableProps = {
      width:Infinity,
      height:300,
      minConstraints:[Infinity, 54],
      maxConstraints:[Infinity, innerHeight *0.9],
      resizeHandles:['s'],
    }
  }

    return <ResizableStyled>
            <ResizableBox {...resizableProps}>
                {children}
            </ResizableBox>
        </ResizableStyled>
}

const ResizableStyled = styled.div`
.resize-horizontal{
  height: 100%;
  display: flex;
  flex-direction: row
}

.react-resizable-handle {
  display: block;
  background-color: #37414b;
  background-repeat: no-repeat;
  background-position: 50%;
}

.react-resizable-handle-s {
  height: 10px;
  width: 100%;
  cursor: row-resize;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
}

.react-resizable-handle-e {
  width: 10px;
  min-width: 10px;
  height: 100%;
  cursor: col-resize;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
}
`;
