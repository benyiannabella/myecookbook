import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMceEditorProps {
	width?: string | number;
	height?: string | number;
	resize?: boolean | 'both' | undefined;
	value?: string;
	onEditorChanged: (content: string) => void;
}

const TinyMceEditor: React.FunctionComponent<TinyMceEditorProps> = ({
	onEditorChanged,
	width,
	height,
	resize,
	value,
}) => {
	const editorRef = useRef<any>(null);

	const handleEditorChange = (content: string) => {
		onEditorChanged(content);
	};
	return (
		<div>
			<Editor
				onInit={(evt, editor) => (editorRef.current = editor)}
				onEditorChange={handleEditorChange}
				initialValue={value}
				init={{
					height: height,
					width: width,
					resize: resize,
					menubar: 'file edit insert format',
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'image',
						'charmap',
						'preview',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'media',
						'table',
						'help',
						'wordcount',
					],
					toolbar:
						'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
					content_style:
						'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
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
