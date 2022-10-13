function getDateVersion(){
    const date = new Date()
    let year = date.getFullYear().toString().slice(2)
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}.${month < 10 ? ('0'+month) : month}.${day < 10 ? ('0'+day) : day}`
}
let clientVersion = getDateVersion()
module.exports = function (env,version){
    version && (clientVersion = version)
    const envObj = {
        development:`dev${clientVersion}.dev`,
        test:`test${clientVersion}.test`,
        staging:`staging${clientVersion}.staging`,
        production:`${clientVersion}.pro`,
    }
    return envObj[env]
}