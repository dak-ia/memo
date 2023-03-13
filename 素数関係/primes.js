function sieveOfEratosthenesBoolList(num) { //エラトステネスのふるい（引数以下の0,1,合成数をfalseとし、素数をtrueとして返す）
    if (num >= 2) {
        let primesArray = new Array(num).fill(true);
        primesArray[0] = primesArray[1] = false;
        for (let i = 2; i <= num; i++) {
            if (!primesArray[i]) {
                continue;
            }
            for (let n = i * 2; n <= num; n += i) {
                primesArray[n] = false;
            }
        }
        return primesArray;
    } else {
        return [];
    }
}

function sieveOfEratosthenesNumList(num) { //エラトステネスのふるいで得た配列からtrueとなったインデックスのみを抜き出す。そのインデックス番号を返す。
    return sieveOfEratosthenesBoolList(num).map((prime, index) => prime == true ? index : false).filter(x => x != false);
}

function isPrime(num) { //引数が素数（2以上の自然数で1とそれ自身以外に約数を持たない数）であるか判断し、素数ならばtrueを、それ以外ならばfalseを返す。
    if (num % 2 == 0 || num < 2) {
        return false;
    }
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}

function getAnyPrime(num) { //n番目の素数を求める。//検証結果4300番目までタイムアウトせずに求められた。（環境次第）
    let primesArray = sieveOfEratosthenesNumList(num);
    let newNum = num;
    let primeNum = false;
    while (!primeNum) {
        if (primesArray.length >= num) {
            primeNum = true;
            return primesArray[num - 1];
        } else {
            newNum = newNum * num + 1;
            primesArray = sieveOfEratosthenesNumList(newNum);
        }
    }
}