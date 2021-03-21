import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PreviewProps {
    code: string;
}

const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener('message',(event) => {
							try{
							eval(event.data);
							}catch(err){
								const root = document.querySelector('#root');
								root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>'+err+'</div>';
								console.error(err);
							}
					},
					false);
				</script>
			</bodY>
		</html>
	`;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframe !== null && iframe.current !== null) {
            iframe.current.srcdoc = html; // reset iframe html before adding any code
			setTimeout(() => {
				iframe.current?.contentWindow?.postMessage(code, '*');
			}, 50);
        }
    }, [code]);

    return (
		<IframeStyled>
        <iframe
            title="code-preview"
            ref={iframe}
            sandbox="allow-scripts"
            srcDoc={html}
        ></iframe>
		</IframeStyled>
    );
};

const IframeStyled = styled.div`
	position: relative;
	height: 100%;
	/* width: 50%; */
	flex-grow: 1;


	iframe{
		height: 100%;
		background: #ffffff;
		width: 100%;
	}

	.react-draggable-transparent-selection &:after{
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left:0;
		bottom: 0;
		opacity: 0;
	}
`
