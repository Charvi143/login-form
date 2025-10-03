
const delay = (d)=> {
        return new Promise((ressolve, reject) => {
            setTimeout(() => {
                ressolve()
            }, d*1000);
        })
    }

export default delay;