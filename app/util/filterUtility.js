const filterify = async (data) => {
    let i=0;
    let j=0;
    let k=0;
    for (let key in data){
        if (key=='cgpa'){
            i=data.cgpa
        }
        if(key=='tenth_percent'){
            j=data.tenth_percent
        }
        if(key=='twelveth_percent'){
            k=data.twelveth_percent
        }
    }
    
    let f_data ={
        cgpa: { gte: i },
        tenth_percent: { gte: j },
        twelveth_percent:{gte:k}
    }
    return f_data;
}
export default filterify;