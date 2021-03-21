import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PreviewProps {
    code: string;
	err: string;
}

const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					const handleError = (err) => {
						const root = document.querySelector('#root');
						root.innerHTML = '<div style="color:#EA2027"><h4>Runtime Error</h4>'+err+'</div>';
						console.error(err);
					}

					window.addEventListener('error', (event) => {
						event.preventDefault();
						handleError(event.error);
					})

					window.addEventListener('message',(event) => {
							try{
							eval(event.data);
							}catch(err){
								handleError(err)
							}
					},
					false);
				</script>
			</bodY>
		</html>
	`;

export const Preview: React.FC<PreviewProps> = ({ code, err }) => {
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
		{err && <div className='error'>{err}</div>}
		</IframeStyled>
    );
};

const IframeStyled = styled.div`
	position: relative;
	height: 100%;
	flex-grow: 1;


	iframe{
		height: 100%;
		background: #ffffff;
		width: 100%;
	}

	.error{
		color:#EA2027;
		position:absolute;
		top:10px;
		left: 10px;
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
