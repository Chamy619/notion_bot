import React, { useState } from 'react';
import Markdown, { compiler } from 'markdown-to-jsx';
// import { render } from 'react-dom';

function Editor() {
    const [markdown, setMarkdown] = useState({});
    const [origin, setOrigin] = useState('');

    const onMarkdownHandler = (event: React.ChangeEvent<HTMLDivElement>) => {
        const target = event.target.childNodes[0];

        let text = '';

        if (target.nodeValue) {
            text = target.nodeValue;
        }

        const result = compiler(text as string);
        // render(result, document.getElementById('test'));     // 변경된 것이 입력 텍스트에 바로 반영될 수 있도록 수정 가능할까?
        setMarkdown(result);
        setOrigin(text);
    }

    return (
        <div>
            <div id="test" contentEditable="true" style={{ width: '100%', border: '1px solid #DDD' }} onInput={onMarkdownHandler}>

            </div>
            <Markdown>{origin}</Markdown>
        </div>

    )
}

export default Editor;