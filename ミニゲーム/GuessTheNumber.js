let number = Math.floor(Math.random() * 100) + 1;
let count = 0;

function guessTheNumber() {
    let input = prompt("1から100までの数あて（Guess the number 1 to 100）：");
    if (input !== null && input !== undefined && input.trim() !== "" && !Number.isNaN(Number(input))) {
        count++;
        if (Number(input) === number) {
            if (confirm(`正解！数は${number}でした。あなたは${count}回の推測しました。もう一度やりますか？\nCorrect answer! The number was ${number}. You tried ${count} guesses.Retry?`)) {
                number = Math.floor(Math.random() * 100) + 1;
                count = 0;
                guessTheNumber();
            } else {
                return true;
            }
        } else if (Number(input) < number) {
            alert(`数はもっと大きいです。（The number is higher.）\n入力値：${input}\nInput value：${input}`);
            guessTheNumber();
        } else if (Number(input) > number) {
            alert(`数はもっと小さいです。（The number is lower.）\n入力値：${input}\nInput value：${input}`);
            guessTheNumber();
        }
    } else {
        if (confirm("途中ですがやめますか？（would you want to cancel?）")) {
            return true;
        } else {
            guessTheNumber();
        }
    }
}

guessTheNumber();