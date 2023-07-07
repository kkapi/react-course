import React, { useState } from 'react';
import { SYMBOL_O, SYMBOL_X } from '../../utils/consts';
import classes from '../../styles/game.module.css';

export function Game() {
	const [cells, setCells] = useState(Array(9).fill(null));

	const [currentStep, setCurrentStep] = useState(SYMBOL_X);

	const getSymbolClassName = symbol => {
		if (symbol === SYMBOL_O) return 'symbol--o';
		if (symbol === SYMBOL_X) return 'symbol--x';
		return '';
	};

	const renderSymbol = symbol => (
		<span
			className={`${classes['symbol']} ${
				classes[getSymbolClassName(symbol)]
			}`}
		>
			{symbol}
		</span>
	);

	const handleCick = index => {
		if (cells[index]) return;
		const newCells = cells.slice();
		newCells[index] = currentStep;
		setCells(newCells);
		setCurrentStep(currentStep === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
	};

	return (
		<div className={classes['game']}>
			<div className={classes['game-info']}>
				Ход: {renderSymbol(currentStep)}
			</div>
			<div className={classes['game-field']}>
				{cells.map((symbol, index) => {
					return (
						<button
							onClick={() => handleCick(index)}
							key={index}
							className={`${classes['cell']}`}
						>
							{symbol ? renderSymbol(symbol) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
}
