// Planning for Slot Machine Project.
// 1. deposit money
// 2. determine number of lines we are betting on
// 3. Colllect a bet amount
// 4. spin the machine
// 5. Check if the user won (which would not happen :) )
// 6. Give the user their winnings (if they win >:) )
// 7. Play Again ( if they're a dummass :) )

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;


const SYMBOLS_COUNT = {
    A:3,
    B:5,
    C:6,
    D:9
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const KRABS_INVALID = ["hmm..that sounds like a fraud.", "huh? this coin sounds fake!","You sound like Plankton my friend,"]
const KRABS_MONEY = ["Money sweeter than honey!", "Money money this, money money that. Profit will make me wallet fat!", "It’s money that makes the world go round!"]

    const getRandomVoiceLine = (lines) => {
        const index = Math.floor(Math.random() * lines.length);
        const randomLine = lines[index];
        return randomLine;
    }

    const deposit = () => {
    while (true){
        const depositAmount = prompt("How Much money do you have: $");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.clear()
            console.log(getRandomVoiceLine(KRABS_INVALID), " try again.");
        } else{
            console.clear()
            console.log(getRandomVoiceLine(KRABS_MONEY))
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true){
        const lines = prompt("how much lines you want to bet on {1-3}: ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.clear()
            console.log(getRandomVoiceLine(KRABS_INVALID) , " try again.");
        } else{
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while (true){
        const bet = prompt("Enter your bet amount per line: ");
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines){
            console.clear()
            console.log(getRandomVoiceLine(KRABS_INVALID) , " try again.");
        } else{
            console.log(getRandomVoiceLine(KRABS_MONEY))
            return betAmount;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i =0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [[],[],[]];
    for (let i =0; i < COLS; i++){
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomElement = symbols[Math.floor(Math.random() * reelSymbols.length)]; 
            reels[i].push(randomElement);
            reelSymbols.pop(randomElement);
        }
    }
    return reels
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (row of rows){
        let rowstr = "";
        for (let i =0; i < COLS; i++){
            rowstr += row[i];
            if (i < COLS - 1){
                rowstr += " | ";
            }
        } 
        console.log(rowstr);
    }
}

const calcWin = (rows, bet, numberOfLines) => {
    let winings = 0;
    for (let i = 0; i < numberOfLines; i++){
        const slotSymbol = rows[i][0];
        for (let j = 0; j < COLS; j++){
            if (rows[i][j] != slotSymbol){
                break;
            }
            
            if ((j == COLS - 1) && rows[i][j] === slotSymbol){
                winings += SYMBOL_VALUES[slotSymbol] * bet;
            }
        }
    }
    return winings;
}
const game = () => {
    let balance = deposit();
    while (true) {
        console.log("balance: $" + balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(1000, numberOfLines);
        balance -= bet * numberOfLines
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winings = calcWin(rows, bet, numberOfLines);
        console.log(winings);
        if (winings === 0){
            console.log("haha, you lose!")
        }
        balance += winings
        if (balance <= 0){
            console.log("you ran out of money!")
            break;
        }
        const playAgain = prompt("Do you want to get scamm..i mean play again (y/n)? ")
        if (playAgain != "y") break;
        
    }
}

console.log("Welcome to Mr.Krabs Slot machine, Ag agagagagag!")
game();
