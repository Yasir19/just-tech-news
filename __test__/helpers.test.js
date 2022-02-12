const { format_date } = require('../utils/helpers');
const {format_plural} = require('../utils/helpers');
const {format_url} = require('../utils/helpers');
it ('should return format_date() return a date string',() => {
    const date = new Date('2022-02-09 22:32:03');
    expect(format_date(date)).toBe('2/9/2022');
});

it ('should return plural forms when comment and point are plural',() => {
   const tiger = 'tiger';
   expect(format_plural(tiger,2)).toEqual("tigers");
   const lion = 'lion';
   expect(format_plural(lion,1)).toEqual("lion");
});

it ('should return a simplified url string',() => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.test2.com/dksajd/');
    const url3 = format_url('https://www.test3.com?q=help');

    expect(url1).toBe('test.com');
    expect(url2).toBe('test2.com');
    expect(url3).toBe('test3.com');

});
