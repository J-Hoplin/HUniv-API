const axios = require('axios');
const cheerio = require('cheerio');
const set = require('./sets');
const { KeynotExist, InstanceNotInitiated, OffsetUnitMultiple } = require('../../Exceptions');

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

    static #HONGIK_PAGINATION = 10;

    constructor(type) {
        this.type = type;
        this.currentNumber = undefined;
        this.totalPage = undefined;
    }

    async init() {
        try {
            const firstPage = await this.getPageFilteredValue();
            const currentNumber = parseInt(firstPage[0][0], 10);
            // ID of latest notice
            this.currentNumber = currentNumber;
            // Total page of board
            this.totalPage = parseInt(currentNumber / Notice.#HONGIK_PAGINATION, 10) + 1;
        } catch (err) {
            console.error(err.message);
        }
    }

    checkInstanceInitiated() {
        if (!(this.currentNumber !== undefined && this.totalPage !== undefined)) {
            throw new InstanceNotInitiated();
        }
        return true;
    }

    async getPageFilteredValue(pagenum = 1, type = this.type) {
        const url = `https://www.hongik.ac.kr/front/boardlist.do?currentPage=${pagenum}&menuGubun=1&siteGubun=1&bbsConfigFK=${set[type].id}&searchField=ALL&searchValue=&searchLowItem=ALL`;
        if (!Object.keys(set).includes(type)) {
            throw new KeynotExist(type);
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

        console.log(`${startpage} ${endpage}`);
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
        console.log(result.length);
        return result;
    }

    async scanWholeBoardList() {
        /**
         * Yet Array.prototype.flat() is not optimized
         * https://stackoverflow.com/questions/61411776/is-js-native-array-flat-slow-for-depth-1
         */
        this.checkInstanceInitiated();
        // Array for result
        let result = [];
        (await Promise.allSettled(Array.from({ length: this.totalPage }, (_, i) => i + 1)
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
    NoticeScrapper: async (type) => {
        const instance = new Notice(type);
        await instance.init();
        return instance;
    },
    set,
};
