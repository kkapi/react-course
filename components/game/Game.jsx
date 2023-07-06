import React from 'react';
import { SYMBOL_O, SYMBOL_X } from '../../utils/consts';
import styles from '../../styles/game.module.css'

export function Game() {
	const cells = [
		SYMBOL_X,
		null,
		null,
		SYMBOL_O,
		SYMBOL_X,
		null,
		null,
		null,
		null,
	];
    
	const currentStep = SYMBOL_O;

	return (
		<div className={styles["game"]}>
			<div className={styles["game-info"]}></div>
			<div className={styles["game-field"]}>
				{cells.map((cell, index) => (
					<button key={index} className={styles["cell"]}>{currentStep}</button>
				))}
			</div>
		</div>
	);
}
