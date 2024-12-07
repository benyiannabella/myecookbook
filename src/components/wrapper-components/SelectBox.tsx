import {
	faCaretDown,
	faPenToSquare,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './SelectBox.scss';
import FormButton from './FormButton';

interface SelectBoxProps {
	dataSource: any[];
	value: string | null;
	caption: string | undefined;
	valueField: string;
	displayField: string;
	showDelete?: boolean;
	showEdit?: boolean;
	onValueChanged: (value: string) => void;
	onEditItem?: (item: any) => void;
	onDeleteItem?: (item: any) => void;
}

const SelectBox: React.FunctionComponent<SelectBoxProps> = ({
	dataSource,
	value,
	caption,
	valueField,
	displayField,
	showDelete,
	showEdit,
	onValueChanged,
	onEditItem,
	onDeleteItem,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<any | null>(null);
	const [position, setPosition] = useState<'up' | 'down'>('down');

	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (value && value !== '' && dataSource) {
			const selected = dataSource.find((item) => item[valueField] === value);
			setSelectedItem(selected[displayField]);
		} else {
			setSelectedItem(null);
		}
	}, [dataSource, displayField, value, valueField]);

	const toggle = (e: any) => {
		if (e) {
			setIsOpen((previousValue) => !previousValue);
		}
	};

	const handleToggleClick = (e: any) => {
		if (selectRef.current) {
			const rect = selectRef.current.getBoundingClientRect();
			const spaceAbove = rect.top;
			const spaceBelow = window.innerHeight - rect.bottom;
			if (spaceBelow < 200 && spaceAbove > spaceBelow) {
				setPosition('up');
			} else {
				setPosition('down');
			}
		}
		toggle(e);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleValueSelected = (selected: string) => {
		onValueChanged(selected);
		setIsOpen(false);
	};

	const handleEditItem = (item: any) => {
		if (onEditItem) {
			onEditItem(item);
		}
	};

	const handleDeleteItem = (item: any) => {
		if (onDeleteItem) {
			onDeleteItem(item);
		}
	};

	return (
		<div
			className="select-container"
			ref={selectRef}
		>
			<div className="select-box">
				<label htmlFor="input">{caption}</label>
				<input
					id="input"
					type="text"
					value={selectedItem ? selectedItem : 'Select...'}
					readOnly
				/>
				<button onClick={handleToggleClick}>
					<FontAwesomeIcon icon={faCaretDown} />
				</button>
			</div>
			{isOpen && (
				<ul className={`select-list select-list-${position}`}>
					{dataSource && dataSource.length > 0 ? (
						dataSource.map((item) => (
							<li
								key={item[valueField]}
								onClick={() => handleValueSelected(item[valueField])}
							>
								<span>{item[displayField]}</span>
								<div className="button-container">
									{showEdit ? (
										<FormButton
											caption=""
											onClick={() => handleEditItem(item)}
										>
											<FontAwesomeIcon icon={faPenToSquare} />
										</FormButton>
									) : null}
									{showDelete ? (
										<FormButton
											caption=""
											onClick={(e: any) => handleDeleteItem(item)}
										>
											<FontAwesomeIcon icon={faTrashCan} />
										</FormButton>
									) : null}
								</div>
							</li>
						))
					) : (
						<li>No Data</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default SelectBox;
