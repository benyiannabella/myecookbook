import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMceEditorProps {}

const TinyMceEditor: React.FunctionComponent<TinyMceEditorProps> = () => {
	const [content, setContent] = useState('');
	const editorRef = useRef<any>(null);

	const handleEditorBlur = () => {
		if (editorRef.current) {
			const cont = editorRef.current.getContent();
			console.log(cont);
			setContent(cont);
		}
	};
	return (
		<div>
			<Editor
				initialValue={content}
				init={{
					height: 500,
					menubar: 'file edit insert format',
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen media table paste code help wordcount',
					],
					toolbar:
						'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
					content_style:
						'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
					setup: (editor) => {
						editor.on('blur', handleEditorBlur);
					},
					mobile: {
						menubar: true,
						toolbar:
							'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | help',
					},
				}}
				apiKey="yjes04yfmvjnt7qjh8xsu64votuo4urazert6qpvzsmpkzuh"
			/>
		</div>
	);
};

export default TinyMceEditor;
