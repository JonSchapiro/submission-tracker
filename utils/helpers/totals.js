const _ = require('lodash');

function newTotals(payload) {
    const boaType = payload.boa ? 'boa' : 'ruim';
    const newTotal = {
        user: payload.user,
        subs: {
            boa: { total : 0 },
            ruim: { total : 0 }
        },
        passes: {
            boa: { total : 0 },
            ruim: { total : 0 }
        },
        sweeps: {
            boa: { total : 0 },
            ruim: { total : 0 }
        },
    };

    newTotal[payload.type][boaType] = {
        [payload.positionName] : { [payload.position] : 1}
    };

    return newTotal;
};

function getUpdatedTotals(payload, oldTotals) {
    const boaType = payload.boa ? 'boa' : 'ruim';
    const currTotalData = oldTotals[payload.type][boaType];
    const boaTypeTotals = currTotalData.total + 1;
    const newTotals = Object.assign({}, {
        [payload.type]: {
            [boaType]: {
                // update stuff in here
                total: boaTypeTotals
            }
        }
    }, oldTotals);

    
    const positionNameTotalData = currTotalData[payload.positionName];

    if (!positionNameTotalData) {
        newTotals[payload.type][boaType][payload.positionName] = {
            [payload.position] : 1
        };
    } else {
       const position = positionNameTotalData[payload.position];

       if (!position) {
            newTotals[payload.type][boaType][payload.positionName][payload.position] = 1;
       } else {
            newTotals[payload.type][boaType][payload.positionName] = {
                [payload.position] : position + 1
            };
       }
    }

    return newTotals;
}

module.exports = {
    newTotals: newTotals,
    getUpdatedTotals: getUpdatedTotals
}


