/**
 * 
 * @param {*} text string
 * @description text to cut
 * @param {*} nc number
 * @description maximum number of characters (nc)
 * @param {*} points Boolean
 * @description (true) enable points, (false) disable points
 * @returns 
 */
const shortText = (text, nc, points = true) => {
    let string = null
    if(text.length > nc){
        if(!points ) string = text.slice(0, nc)
        if( points ) string = text.slice(0, nc).concat('...');
        return string
    }else{
        return text
    }
    
    
}

export default shortText