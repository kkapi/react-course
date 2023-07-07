import React, { useState } from 'react';
import { SYMBOL_O, SYMBOL_X } from '../../utils/consts';
import classes from '../../styles/game.module.css';
import { computeWinner } from '../../utils/game';

export function Game() {
	const [cells, setCells] = useState(Array(9).fill(null));
	const [currentStep, setCurrentStep] = useState(SYMBOL_X);
	const [winnerSequence, setWinnerSequence] = useState();

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

	const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;

	const handleCick = index => {
		if (cells[index] || winnerSequence) return;
		const cellsCopy = cells.slice();
		cellsCopy[index] = currentStep;

		const winner = computeWinner(cellsCopy);

		setCells(cellsCopy);
		setCurrentStep(currentStep === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
		setWinnerSequence(winner);
	};

	return (
		<div className={classes['game']}>
			<div className={classes['game-info']}>
				{winnerSequence ? 'Победитель: ' : 'Ход: '}{renderSymbol(winnerSymbol ?? currentStep)}
			</div>
			<div className={classes['game-field']}>
				{cells.map((symbol, index) => {
					const isWinner = winnerSequence?.includes(index);
					return (
						<button
							onClick={() => handleCick(index)}
							key={index}
							className={`${classes['cell']} ${isWinner ? classes['cell--win'] : ''}`}
						>
							{symbol ? renderSymbol(symbol) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
}
