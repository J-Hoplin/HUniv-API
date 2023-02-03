const axios = require('axios');
const cheerio = require('cheerio');
const set = require('./sets.json');
const { InvalidNoticeType, InvalidNoticeNumber, OffsetUnitMultiple } = require('../../Exceptions').app.Notice;

/**
 *
 * Cheerio Document : https://cheerio.js.org/index.html
 *
 *
 * Without toArray() returns Iterable
 * 'loadedCheerIOArray' not array(For example in cheerio filter or map)
 *
 */

class Notice {
    static #HONGIK_BASE_URL = 'https://www.hongik.ac.kr';

    static #HONGIK_PAGINATION = process.env.DEFAULT_PAGINATION || 10;

    constructor(type) {
        this.type = type;
    }

    async getCurrentNoticeNumber() {
        return parseInt((await this.getPageFilteredValue())[0][0], 10);
    }

    async getTotalPageNumber() {
        // Get notice current notice's number
        const currentNumber = await this.getCurrentNoticeNumber();

        // Get notice total page length
        return currentNumber % Notice.#HONGIK_PAGINATION
            ? parseInt(currentNumber / Notice.#HONGIK_PAGINATION, 10) + 1
            : parseInt(currentNumber / Notice.#HONGIK_PAGINATION, 10);
    }

    async searchByNoticeNumber(number) {
        if (number <= 0) {
            throw InvalidNoticeNumber(number);
        }
        const currentNumber = await this.getCurrentNoticeNumber();
        const targetPage = parseInt((currentNumber - number) / 10, 10) + 1;
        return (await this.getPageFilteredValue(targetPage)).filter((x) => x[0] === number);
    }

    async getPageFilteredValue(pagenum = 1, type = this.type) {
        const url = `https://www.hongik.ac.kr/front/boardlist.do?currentPage=${pagenum}&menuGubun=1&siteGubun=1&bbsConfigFK=${set[type].id}&searchField=ALL&searchValue=&searchLowItem=ALL`;
        if (!Object.keys(set).includes(type)) {
            throw new InvalidNoticeType(type);
        }
        let html;
        try {
            html = (await axios.get(url)).data;
        } catch (err) {
            console.error(err.message);
        }
        const $ = cheerio.load(html);
        const $notices = $('body > div > div > div:nth-child(3) > div > table > tbody').children('tr');
        const $filterNotice = $notices
            .filter((i, elm) => $(elm).children('td').first().text())
            .map((i, elm) => {
                const tdElm = $(elm)
                    .children('td')
                    .map((i, elm) => {
                        const elmtext = $(elm).text().trim();
                        // Get title and it's hyperlink url
                        if (i === 1) {
                            const hyperlink = $(elm).children('div').first().children('a')
                                .attr('href');
                            return {
                                title: elmtext,
                                url: `${Notice.#HONGIK_BASE_URL}${hyperlink}`,
                            };
                        } if (i === 3) {
                            const atts = $(elm).children('a');
                            return !atts ? [] : new Array(atts.map((i, elm) => {
                                const link = $(elm).attr('href');
                                const fileHyperlink = `${Notice.#HONGIK_BASE_URL}${link}`;
                                // url.parse has been deprecated
                                // Use URL Object searchParams
                                const urll = new URL(fileHyperlink);
                                return {
                                    name: urll.searchParams.get('fileName'),
                                    url: fileHyperlink,
                                };
                            }).toArray());
                        }
                        return elmtext;
                    })
                    .toArray();
                tdElm.push(this.type);
                return new Array(tdElm);
            }).toArray();
        return $filterNotice;
    }

    async getByLimitOffset(offset, limit) {
        if (offset % Notice.#HONGIK_PAGINATION) {
            throw new OffsetUnitMultiple(Notice.#HONGIK_PAGINATION);
        }
        const startpage = (offset / Notice.#HONGIK_PAGINATION) + 1;
        const endpage = limit % Notice.#HONGIK_PAGINATION
            ? parseInt((offset + limit) / Notice.#HONGIK_PAGINATION, 10) + 1
            : parseInt((offset + limit) / Notice.#HONGIK_PAGINATION, 10);

        let result = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const i of Array.from(
            { length: (endpage - startpage) + 1 },
            (_, i) => i + startpage,
        )) {
            // eslint-disable-next-line no-await-in-loop
            const page = await this.getPageFilteredValue(i);
            if (i === endpage && limit % Notice.#HONGIK_PAGINATION) {
                result = result.concat(page.slice(0, limit % Notice.#HONGIK_PAGINATION));
            } else {
                result = result.concat(page);
            }
        }
        return result;
    }

    async scanWholeBoardList() {
        const totalPage = await this.getTotalPageNumber();
        /**
         * Yet Array.prototype.flat() is not optimized
         * https://stackoverflow.com/questions/61411776/is-js-native-array-flat-slow-for-depth-1
         */
        // Array for result
        let result = [];
        (await Promise.allSettled(Array.from({ length: totalPage }, (_, i) => i + 1)
            .map((x) => this.getPageFilteredValue(x))))
            .filter((x) => {
                const { status } = x;
                return status !== 'rejected';
            }).map((x) => {
                result = result.concat(x.value);
                return x.value;
            });
        return result;
    }
}

module.exports = {
    Notice,
    set,
};
