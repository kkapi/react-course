import React from 'react';
import { SYMBOL_O, SYMBOL_X } from '../../utils/consts';
import classes from '../../styles/game.module.css';

export function Game() {
	const cells = [
		SYMBOL_X,
		null,
		null,
		SYMBOL_O,
		SYMBOL_X,
		null,
		SYMBOL_O,
		null,
		null,
	];
	const currentStep = SYMBOL_X;

	const getSymbolClassName = symbol => {
		if (symbol === SYMBOL_O) return 'symbol--o';
		if (symbol === SYMBOL_X) return 'symbol--x';
		return '';
	};

	const renderSymbol = symbol => (
		<span className={`${classes['symbol']} ${classes[getSymbolClassName(symbol)]}`}>
			{symbol}
		</span>
	);

	return (
		<div className={classes["game"]}>
			<div className={classes["game-info"]}>Ход: {renderSymbol(currentStep)}</div>
			<div className={classes["game-field"]}>
				{cells.map((symbol, index) => {
					return (
						<button key={index} className={`${classes['cell']}`}>
							{symbol ? renderSymbol(symbol) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
}
