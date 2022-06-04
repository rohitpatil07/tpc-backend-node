import prisma from '../config/prisma.js';
import sorting from '../util/eligibleSorting.js';
const getEligibleStudents = async () => {
  try {
    let package_one_sorting = await prisma.student_placement_details.findMany({
      take:10,
      select:{
        rollno:true,
        placed_org_one:true,
        package_one:true,
        placed_org_two:true,
        package_two:true,
      },
      orderBy: {
          package_one: 'desc',
      }
    });
    let package_two_sorting = await prisma.student_placement_details.findMany({
      take:10,
      select:{
        rollno:true,
        placed_org_one:true,
        package_one:true,
        placed_org_two:true,
        package_two:true,
      },
      orderBy: {
          package_two: 'desc',
      }
    });
    let new_package_one = [];
    for(let i=0;i<package_one_sorting.length;i++){
      if(package_one_sorting[i].package_one>package_one_sorting[i].package_two){
        new_package_one.push(package_one_sorting[i]);
      }
    }
    let new_package_two=[];
    for(let i=0;i<package_two_sorting.length;i++){
      if(package_two_sorting[i].package_one<package_two_sorting[i].package_two){
        new_package_two.push(package_two_sorting[i]);
      }
    }
    let list = await sorting(new_package_one,new_package_two);
    return list;
  } catch (error) {
    return error;
  }
};

export default { getEligibleStudents };
