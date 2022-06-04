const sorting = async(new_package_one,new_package_two)=>{
    let finaltoplist = [];
    for(let i = 0; i<new_package_one.length;i++){
        let object = {
            rollno: new_package_one[i].rollno,
            placed_org:new_package_one[i].placed_org_one,
            package:new_package_one[i].package_one
        }
        finaltoplist.push(object);
    }
    for(let i = 0; i<new_package_two.length;i++){
        let object = {
            rollno: new_package_two[i].rollno,
            placed_org:new_package_two[i].placed_org_two,
            package:new_package_two[i].package_two
        }
        finaltoplist.push(object);
    }
    let newList = finaltoplist.sort(function(a, b) {
        return parseFloat(a.package) - parseFloat(b.package);
    });
    let reversedList = newList.reverse();
    let slicedArray;
    if (reversedList.length>10){
        slicedArray = reversedList.slice(0, 10);
        return slicedArray;
    }
    else{
        return reversedList;
    }
}

export default sorting;