const state = {
    LayoutData: {
        ClientHeight: 0,
        addNewPage:()=>{}
    }
};

function reducer (state: any, action: any) {
    switch (action.type) {
        case "updateContext":
            return {
                ...state,
                ...action.payload
            };
    }
}

export {
    state,
    reducer
};
