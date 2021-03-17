import React, { useEffect, useRef } from 'react';

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
            iframe.current.contentWindow?.postMessage(code, '*');
        }
    }, [code]);

    return (
        <iframe
            title="code-preview"
            ref={iframe}
            sandbox="allow-scripts"
            srcDoc={html}
        ></iframe>
    );
};
