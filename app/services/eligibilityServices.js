import prisma from '../config/prisma.js';
import sorting from '../util/eligibleSorting.js';
const getEligibleStudents = async () => {
  try {
    let package_one_sorting = await prisma.student_placement_details.findMany({
      take: 10,
      select: {
        rollno: true,
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
        rollno: true,
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

const getCompanyWisePackage = async () => {
  let packages = [];

  try {
    let package_data_org1 = await prisma.student_placement_details.findMany({
      select: {
        placed_org_one: true,
        // package_one: true,
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
        // package_two: true,
      },
      where: {
        package_two: { gte: 0 },
      },
    });

    package_data_org2.forEach((data) => {
      companies_set.add(data['placed_org_two']);
    });

    //get unique company names
    let companies = [];
    companies_set.forEach((name) => companies.push(name));

    //get company wise packages and add their combination to main package list

    for (let company in companies) {
      let data = await getPackagesPerCompany(companies[company]);
      packages.push(data);
    }
    console.log(packages);

    return packages;
  } catch (error) {
    return error;
  }
};

const getPackagesPerCompany = async (company) => {
  let packages_data = {};
  let packages_set = new Set();
  let packages = [];
  console.log(company);

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

  package_data1.forEach((data) => packages_set.add(data['package_one']));
  package_data2.forEach((data) => packages_set.add(data['package_two']));
  packages_set.forEach((data) => packages.push(data));

  packages_data[company] = packages;

  // console.log(packages_data);
  return packages_data;
};

export default { getEligibleStudents, getCompanyWisePackage };
