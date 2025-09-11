/**
* 将字节数格式化为易于阅读的文件大小格式。
*
* @param {number} bytes - 要格式化的字节数。
* @returns {string} - 格式化后的文件大小字符串，例如 "123.45 KB"。
*/
function formatFileSize(bytes)
{
    const UNITS=['B', 'KB', 'MB', 'GB', 'TB'];
    const THRESHOLD=1024;

    if (bytes<THRESHOLD) return `${bytes} ${UNITS[0]}`;

    let unitIndex=0;
    while (bytes>=THRESHOLD&&unitIndex<UNITS.length-1)
    {
        bytes/=THRESHOLD;
        unitIndex++;
    }

    return `${bytes.toFixed(2)} ${UNITS[unitIndex]}`;
}

/**
* 将列号转换为Excel中的列字母表示
*
* @param columnNumber 列号（从1开始）
* @returns 返回对应的列字母表示
*/
function getColumnLetter(columnNumber)
{
    let letter='';
    while (columnNumber>0)
    {
        let remainder=(columnNumber-1)%26;
        letter=String.fromCharCode(65+remainder)+letter;
        columnNumber=Math.floor((columnNumber-1)/26);
    }
    return letter;
}

/**
* 打印输出传入的参数
*
* @param {...any} args - 要打印输出的参数
*/
function print(...args)
{
    console.log(...args);
}

// print(getColumnLetter(27)); 

function getSheetRange(sheetName)
{
    let minROW=4;
    let minCOL=1;
    let maxROW=0;
    let maxCOL=0;
    switch (sheetName.toString())
    {
        case "期间费用预算":
            maxROW=121;
            maxCOL=10;
            break;
        case "利润表预算":
            maxROW=51;
            maxCOL=17;
            break;
        case "现金流量预算":
            maxROW=43;
            maxCOL=10;
            break;
        case "资产负债表预算":
            maxROW=49;
            maxCOL=13;
            break;
        case "固定资产购置预算":
            maxROW=15;
            maxCOL=8;
            break;
        default:
            maxROW=0;
            maxCOL=0;
    }
    return [minROW, minCOL, maxROW, maxCOL];
}

// console.log(minROW, minCOL, maxROW, maxCOL);