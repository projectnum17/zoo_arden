module.exports = function (arr, start, end) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.slice(start, end);
};

// EXAMPLE (для обрезки вывода массива из data)
{
/*
    <ul class="addit__cards">
        {{#each (sliceCollect leisures.leisures 0 2)}}
        <li>
            {{> _leisureBox this}}
        </li>
        {{/each}}
    </ul>
*/
}
