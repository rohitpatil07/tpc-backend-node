import prisma from '../config/prisma.js';
import sorting from '../util/eligibleSorting.js';
const getTopPlacedStudents = async () => {
  try {
    let student_list = await prisma.student_placement_details.findMany({
      take: 10,
      select: {
        roll_no: true,
        placed_company: true,
        placed_package: true,
      },
      orderBy: {
        placed_package: 'desc',
      },
    });    
    return student_list;
  } catch (error) {
    return error;
  }
};

const getSelectedStudentsCompanyWise = async () => {
  try {
    let lpa = await prisma.student_placement_details.groupBy({
      by: ['placed_company'],
      _count: {
        placed_company: true,
      },
    });
    
    let restructure_array = [];
    for(let i=0;i<lpa.length;i++){
      let refined_object = {
        placed_company:lpa[i].placed_company,
        count:lpa[i]._count.placed_company
      }
      restructure_array.push(refined_object);
    }
    return restructure_array;
  } catch (error) {
    return error;
  }
};
const getSelectedStudentsLpaWise = async () => {
  try {
    let lpa = await prisma.student_placement_details.groupBy({
      by: ['placed_package'],
      _count: {
        placed_package: true,
      },
    });
    
    let restructure_array = [];
    for(let i=0;i<lpa.length;i++){
      let refined_object = {
        placed_package:lpa[i].placed_package,
        count:lpa[i]._count.placed_package
      }
      restructure_array.push(refined_object);
    }
    return restructure_array;
  } catch (error) {
    return error;
  }
};

const getofferCount = async()=>{
  try{
  let offers = await prisma.student_placement_details.findMany({
    select:{
      roll_no:true,
      offer_letter_one:true,
      offer_letter_two:true,
      offer_letter_three:true,
    }
  });
  let restructure_array = [];
  for(let i=0;i<offers.length;i++){
    let count = 0;
    if(offers[i].offer_letter_one){
      count++;
    }
    if(offers[i].offer_letter_two){
      count++;
    }
    if(offers[i].offer_letter_three){
      count++;
    }
    let object={
      roll_no:offers[i].roll_no,
      offer_count:count,
    }
    restructure_array.push(object);
  }
  return restructure_array;
}
catch(error){
  return error;
}
}
const getCompanyWisePackage = async () => {
  let packages = [];

  try {
    let package_data_org1 = await prisma.student_placement_details.findMany({
      select: {
        placed_org_one: true,
      },
      where: {
        package_one: { gte: 0 },
      },
    });

    let companies_set = new Set();

    package_data_org1.forEach((data) => {
      companies_set.add(data['placed_org_one']);
    });

    let package_data_org2 = await prisma.student_placement_details.findMany({
      select: {
        placed_org_two: true,
      },
      where: {
        package_two: { gte: 0 },
      },
    });

    package_data_org2.forEach((data) => {
      companies_set.add(data['placed_org_two']);
    });

    let package_data_org3 = await prisma.student_placement_details.findMany({
      select: {
        placed_org_three: true,
      },
      where: {
        package_three: { gte: 0 },
      },
    });

    package_data_org3.forEach((data) => {
      companies_set.add(data['placed_org_three']);
    });

    //get unique company names
    let companies = [];
    companies_set.forEach((name) => companies.push(name));

    //get company wise packages and add their combination to main package list

    for (let company in companies) {
      let data = await getPackagesPerCompany(companies[company]);
      packages.push(data);
    }

    return packages;
  } catch (error) {
    return error;
  }
};

const getPackagesPerCompany = async (company) => {
  let packages_data = {};
  let packages_set = new Set();
  let packages = [];

  let package_data1 = await prisma.student_placement_details.findMany({
    select: {
      package_one: true,
    },
    where: {
      placed_org_one: company,
    },
  });

  let package_data2 = await prisma.student_placement_details.findMany({
    select: {
      package_two: true,
    },
    where: {
      placed_org_two: company,
    },
  });

  let package_data3 = await prisma.student_placement_details.findMany({
    select: {
      package_three: true,
    },
    where: {
      placed_org_three: company,
    },
  });

  package_data1.forEach((data) => packages_set.add(data['package_one']));
  package_data2.forEach((data) => packages_set.add(data['package_two']));
  package_data3.forEach((data) => packages_set.add(data['package_three']));
  packages_set.forEach((data) => packages.push(data));

  packages_data[company] = packages;

  return packages_data;
};

export default {
  getofferCount,
  getTopPlacedStudents,
  getSelectedStudentsCompanyWise,
  getSelectedStudentsLpaWise,
  getCompanyWisePackage,
};
