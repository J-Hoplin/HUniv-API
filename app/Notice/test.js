const { NoticeScrapper } = require('./index')
const set = require('./sets')


const main = async () => {
    const result = await Promise.allSettled(Object.keys(set).map(val => {
        // async() 함수는 실행시 프로미스를 반환한다 그렇기에 실행을 하여 함수 자체에 대한 반환이 아닌 프로미스를 반환한다.
        return (async function () {
            const instance = await NoticeScrapper(val)
            return await instance.scanWholeBoardList()
        })()
    }))
    console.log(result)
    // const instance = await NoticeScrapper("normal");
    // const res = await instance.scanWholeBoardList()
    // console.log(res)
}

main();