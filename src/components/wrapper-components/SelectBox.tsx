import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './SelectBox.scss';

interface SelectBoxProps {
	dataSource: any[];
	value: string | undefined;
	caption: string | undefined;
	valueField: string;
	displayField: string;
	onValueChanged: (value: string) => void;
}

const SelectBox: React.FunctionComponent<SelectBoxProps> = ({
	dataSource,
	value,
	caption,
	valueField,
	displayField,
	onValueChanged,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<any | null>(null);

	useEffect(() => {
		if (value && dataSource) {
			const selected = dataSource.find((item) => item[valueField] === value);
			setSelectedItem(selected[displayField]);
		}
	}, [value, dataSource, valueField, displayField]);

	const handleButtonClick = (e: any) => {
		if (e) {
			setIsOpen((previousValue) => !previousValue);
		}
	};

	const handleValueSelected = (value: string) => {
		onValueChanged(value);
		setIsOpen(false);
	};

	return (
		<div className="select-container">
			<div className="select-box">
				<label htmlFor="input">{caption}</label>
				<input
					id="input"
					type="text"
					value={selectedItem || 'Select...'}
					readOnly
				/>
				<button onClick={handleButtonClick}>
					<FontAwesomeIcon icon={faCaretDown} />
				</button>
			</div>
			{isOpen && (
				<ul className="select-list">
					{dataSource.map((item) => (
						<li
							key={item[valueField]}
							onClick={() => handleValueSelected(item[valueField])}
						>
							{item[displayField]}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SelectBox;
