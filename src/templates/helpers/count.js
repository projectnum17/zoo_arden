module.exports = function (n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i) {
        accum += block.fn(i);
    }
    return accum;
};

// EXAMPLE (вывод необходимого повторябщегося кол-ва)
// {{#count 2}}
// <span>text</span>
// {{/count}}