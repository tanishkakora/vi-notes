import './editor.css';
type Props = {
    text: string;
    setText: (value: string) => void;
    onPaste?: () => void; 
};

function Editor({ text, setText, onPaste }: Props) {
    return (
        <div className="editor-container">
            <textarea
                className="editor"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing your thoughts..."
                onPaste={onPaste}
            />
        </div>
    );
}

export default Editor;