const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url')
const set = require('./sets');
const { KeynotExist, AxiosError, InstanceNotInitiated } = require('../../Exceptions');

/**
 * 
 * Cheerio Document : https://cheerio.js.org/index.html
 * 
 * 
 * Without toArray() returns Iterable 'loadedCheerIOArray' not array(For example in cheerio filter or map)
 * 
 */

class Notice {
    static #HONGIK_BASE_URL = "https://www.hongik.ac.kr"

    constructor(type) {
        this.type = type;
        this.currentNumber = undefined;
        this.totalPage = undefined;
    }

    async init() {
        try {
            const firstPage = await this.getPageFilteredValue();
            const currentNumber = parseInt(firstPage[0][0])
            // ID of latest notice
            this.currentNumber = currentNumber
            // Total page of board
            this.totalPage = parseInt(currentNumber / 10) + 1
        } catch (err) {
            console.error(err)
        }
    }

    checkInstanceInitiated() {
        if (!(this.currentNumber !== undefined && this.totalPage !== undefined)) {
            throw new InstanceNotInitiated();
        }
        return true
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
            console.error(err);
            throw new AxiosError();
        }
        const $ = cheerio.load(html);
        const $notices = $("body > div > div > div:nth-child(3) > div > table > tbody").children('tr')
        const $filterNotice = $notices
            .filter((i, elm) => {
                return $(elm).children('td').first().text()
            })
            .map((i, elm) => {
                const tdElm = $(elm)
                    .children('td')
                    .map((i, elm) => {
                        const elmtext = $(elm).text().trim()
                        // Get title and it's hyperlink url
                        if (i === 1) {
                            const hyperlink = $(elm).children('div').first().children('a').attr('href')
                            return {
                                title: elmtext,
                                url: `${Notice.#HONGIK_BASE_URL}${hyperlink}`
                            }
                        } else if (i === 3) {
                            const atts = $(elm).children('a')
                            return !atts ? new Array() : new Array(atts.map((i, elm) => {
                                const link = $(elm).attr('href')
                                const fileHyperlink = `${Notice.#HONGIK_BASE_URL}${link}`
                                // url.parse has been deprecated
                                // Use URL Object searchParams
                                const url = new URL(fileHyperlink)
                                return {
                                    name: url.searchParams.get('fileName'),
                                    url: fileHyperlink
                                }
                            }).toArray())
                        } else {
                            return elmtext
                        }
                    })
                    .toArray()
                // console.log(tdElm)
                return new Array(tdElm)
            }).toArray()
        return $filterNotice
    }

    async scanWholeBoardList() {
        this.checkInstanceInitiated();
        return (await Promise.allSettled(Array.from({ length: this.totalPage }, (_, i) => i + 1).map(x => {
            return this.getPageFilteredValue(x);
        }))).filter(x => {
            const { status } = x
            return status !== "rejected"
        })
    }
}

module.exports.NoticeScrapper = async (type) => {
    const instance = new Notice(type);
    await instance.init();
    return instance
}