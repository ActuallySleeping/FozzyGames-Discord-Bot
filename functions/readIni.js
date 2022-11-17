import fs from 'fs';

const readBraket = (values) => {
    return values.map(e => {
        return {
            [e.split('=')[0]] : e.split('=')[1]
        }
    })[0];
}

export function readIni(filePathFromProjetRoot) {
    const file = fs.readFileSync(process.cwd() + '/' + filePathFromProjetRoot, 'utf8').split('\n').filter(e => e !== '');

    let results = {};
    let lastCategory = '';
    for (let line of file){
        if( line.startsWith('[') ){
            lastCategory = line.replace('[', '').replace(']', '');
            results[lastCategory] = {};

        }
        else {
            // needs to be reworked to handle infinite depth
            line = line.replaceAll(')', '')
            let key = line.split('=')[0]; 
            let value = line.slice(key.length + 1);
            
            if( value.includes(',') ){
                let key2 = value.split(',')[0].split('=')[1].replaceAll('"', '');
                let values = value.split(',').slice(1);

                if (results[lastCategory][key] === undefined) results[lastCategory][key] = {};
                
                if( values.some(e => e.includes('(')) ){
                    let key3 = values[0].split('=')[0]
                    values = [values[0].split('(')[1]].concat(values.slice(1));

                    if (results[lastCategory][key][key2] === undefined) results[lastCategory][key][key2] = {};

                    results[lastCategory] = {
                        ...results[lastCategory],
                        [key] : {
                            ...results[lastCategory][key],
                            [key2] : {
                                ...results[lastCategory][key][key2],
                                [key3] : readBraket(values)
                            },
                        },
                    }

                } else {
                    results[lastCategory] = {
                        ...results[lastCategory],
                        [key] : {
                            ...results[lastCategory][key],
                            [key2] : readBraket(values)
                        },
                    }

                }


            } else {
                results[lastCategory] = {
                    ...results[lastCategory] ?? {},
                    [key] : value
                }
            }
        }
    }

    return results;
}