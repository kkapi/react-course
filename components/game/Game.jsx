import React, { useState } from 'react';
import { SYMBOL_O, SYMBOL_X } from '../../utils/consts';
import classes from '../../styles/game.module.css';
import { computeWinner } from '../../utils/game';

export function Game() {
	const {
		cells,
		currentStep,
		winnerSequence,
		handleClick,
		handleReset,
		winnerSymbol,
		isDraw,
	} = useGameState();

	return (
		<div className={classes['game']}>
			<GameInfo
				isDraw={isDraw}
				winnerSymbol={winnerSymbol}
				currentStep={currentStep}
			/>
			<div className={classes['game-field']}>
				{cells.map((symbol, index) => (
					<GameCell
						onClick={() => handleClick(index)}
						key={index}
						isWinner={winnerSequence?.includes(index)}
						symbol={symbol}
					/>
				))}
			</div>
			<button style={{ marginTop: '15px' }} onClick={handleReset}>
				Сбросить
			</button>
		</div>
	);

	function useGameState() {
		const [cells, setCells] = useState(Array(9).fill(null));
		const [currentStep, setCurrentStep] = useState(SYMBOL_X);
		const [winnerSequence, setWinnerSequence] = useState();

		const handleClick = index => {
			if (cells[index] || winnerSequence) return;
			const cellsCopy = cells.slice();
			cellsCopy[index] = currentStep;

			const winner = computeWinner(cellsCopy);

			setCells(cellsCopy);
			setCurrentStep(currentStep === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
			setWinnerSequence(winner);
		};

		const handleReset = () => {
			setCells(Array(9).fill(null));
			setCurrentStep(SYMBOL_X);
			setWinnerSequence(undefined);
		};

		const winnerSymbol = winnerSequence
			? cells[winnerSequence[0]]
			: undefined;
		const isDraw =
			!winnerSequence && cells.filter(value => value).length === 9;

		return {
			cells,
			currentStep,
			winnerSequence,
			handleClick,
			handleReset,
			winnerSymbol,
			isDraw,
		};
	}

	function GameInfo({ isDraw, winnerSymbol, currentStep }) {
		if (isDraw) {
			return <div className={classes['game-info']}>Ничья</div>;
		}

		if (winnerSymbol) {
			return (
				<div className={classes['game-info']}>
					Победитель: <GameSymbol symbol={winnerSymbol} />
				</div>
			);
		}

		return (
			<div className={classes['game-info']}>
				Ход: <GameSymbol symbol={currentStep} />
			</div>
		);
	}

	function GameCell({ isWinner, onClick, symbol }) {
		return (
			<button
				onClick={onClick}
				className={`${classes['cell']} ${
					isWinner ? classes['cell--win'] : ''
				}`}
			>
				{symbol ? <GameSymbol symbol={symbol} /> : null}
			</button>
		);
	}

	function GameSymbol({ symbol }) {
		function getSymbolClassName(symbol) {
			if (symbol === SYMBOL_O) return 'symbol--o';
			if (symbol === SYMBOL_X) return 'symbol--x';
			return '';
		}

		return (
			<span
				className={`${classes['symbol']} ${
					classes[getSymbolClassName(symbol)]
				}`}
			>
				{symbol}
			</span>
		);
	}
}
