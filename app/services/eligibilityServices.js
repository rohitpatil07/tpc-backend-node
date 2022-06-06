import prisma from '../config/prisma.js';
import sorting from '../util/eligibleSorting.js';
const getEligibleStudents = async () => {
  try {
    let package_one_sorting = await prisma.student_placement_details.findMany({
      take: 10,
      select: {
        roll_no: true,
        placed_org_one: true,
        package_one: true,
        placed_org_two: true,
        package_two: true,
      },
      orderBy: {
        package_one: 'desc',
      },
    });
    let package_two_sorting = await prisma.student_placement_details.findMany({
      take: 10,
      select: {
        roll_no: true,
        placed_org_one: true,
        package_one: true,
        placed_org_two: true,
        package_two: true,
      },
      orderBy: {
        package_two: 'desc',
      },
    });
    let new_package_one = [];
    for (let i = 0; i < package_one_sorting.length; i++) {
      if (
        package_one_sorting[i].package_one > package_one_sorting[i].package_two
      ) {
        new_package_one.push(package_one_sorting[i]);
      }
    }
    let new_package_two = [];
    for (let i = 0; i < package_two_sorting.length; i++) {
      if (
        package_two_sorting[i].package_one < package_two_sorting[i].package_two
      ) {
        new_package_two.push(package_two_sorting[i]);
      }
    }
    let list = await sorting(new_package_one, new_package_two);
    return list;
  } catch (error) {
    return error;
  }
};

const getSelectedStudentsCompanyWise = async () => {
  try {
    let placedOrgOne = await prisma.student_placement_details.groupBy({
      by: ['placed_org_one'],
      _count: {
        placed_org_one: true,
      },
    });
    let placedOrgTwo = await prisma.student_placement_details.groupBy({
      by: ['placed_org_two'],
      _count: {
        placed_org_two: true,
      },
    });
    let array1 = [];
    for (let i = 0; i < placedOrgOne.length; i++) {
      if (placedOrgOne[i].placed_org_one == null) {
        placedOrgOne.splice(i, 1);
      }
    }
    for (let i = 0; i < placedOrgOne.length; i++) {
      let object = {
        organization: placedOrgOne[i].placed_org_one,
        count: placedOrgOne[i]._count.placed_org_one,
      };
      array1.push(object);
    }
    let array2 = [];
    for (let i = 0; i < placedOrgTwo.length; i++) {
      if (placedOrgTwo[i].placed_org_two == null) {
        placedOrgTwo.splice(i, 1);
      }
    }
    for (let i = 0; i < placedOrgTwo.length; i++) {
      let object = {
        organization: placedOrgTwo[i].placed_org_two,
        count: placedOrgTwo[i]._count.placed_org_two,
      };
      array2.push(object);
    }
    let final_array = [];
    for (let i = 0; i < placedOrgOne.length; i++) {
      for (let j = 0; j < placedOrgTwo.length; j++) {
        if (placedOrgOne[i].placed_org_one == placedOrgTwo[j].placed_org_two) {
          let count =
            placedOrgOne[i]._count.placed_org_one +
            placedOrgTwo[j]._count.placed_org_two;
          let object = {
            organization: placedOrgOne[i].placed_org_one,
            count: count,
          };
          final_array.push(object);
        }
      }
    }
    let unique_array = [];
    for (let i = 0; i < array1.length; i++) {
      for (let k = 0; k < final_array.length; k++) {
        if (array1[i].organization == final_array[k].organization) {
          array1.splice(i, 1);
        }
      }
    }
    final_array = final_array.concat(array1);
    unique_array = array2.filter((object1) => {
      return !final_array.some((object2) => {
        return object1.organization === object2.organization;
      });
    });
    final_array = final_array.concat(unique_array);
    return final_array;
  } catch (error) {
    return error;
  }
};
const getSelectedStudentsLpaWise = async () => {
  try {
    let packageOne = await prisma.student_placement_details.groupBy({
      by: ['package_one'],
      _count: {
        package_one: true,
      },
    });
    let packageTwo = await prisma.student_placement_details.groupBy({
      by: ['package_two'],
      _count: {
        package_two: true,
      },
    });

    let array1 = [];
    for (let i = 0; i < packageOne.length; i++) {
      if (packageOne[i].package_one == null) {
        packageOne.splice(i, 1);
      }
    }
    for (let i = 0; i < packageOne.length; i++) {
      let object = {
        package: packageOne[i].package_one,
        count: packageOne[i]._count.package_one,
      };
      array1.push(object);
    }
    let array2 = [];
    for (let i = 0; i < packageTwo.length; i++) {
      if (packageTwo[i].package_two == null) {
        packageTwo.splice(i, 1);
      }
    }
    for (let i = 0; i < packageTwo.length; i++) {
      let object = {
        package: packageTwo[i].package_two,
        count: packageTwo[i]._count.package_two,
      };
      array2.push(object);
    }

    let final_array = [];
    for (let i = 0; i < packageOne.length; i++) {
      for (let j = 0; j < packageTwo.length; j++) {
        if (packageOne[i].package_one == packageTwo[j].package_two) {
          let count =
            packageOne[i]._count.package_one + packageTwo[j]._count.package_two;
          let object = {
            package: packageOne[i].package_one,
            count: count,
          };
          final_array.push(object);
        }
      }
    }

    let unique_array = [];
    for (let i = 0; i < array1.length; i++) {
      for (let k = 0; k < final_array.length; k++) {
        if (array1[i].package == final_array[k].package) {
          array1.splice(i, 1);
        }
      }
    }
    final_array = final_array.concat(array1);
    unique_array = array2.filter((object1) => {
      return !final_array.some((object2) => {
        return object1.package === object2.package;
      });
    });
    final_array = final_array.concat(unique_array);
    return final_array;
  } catch (error) {
    return error;
  }
};

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
  getEligibleStudents,
  getSelectedStudentsCompanyWise,
  getSelectedStudentsLpaWise,
  getCompanyWisePackage,
};
