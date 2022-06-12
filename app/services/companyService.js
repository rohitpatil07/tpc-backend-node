import prisma from '../config/prisma.js';

const getCompany = async () => {
    try {
        let comp = await prisma.student_placement_details.groupBy({
            by:['placed_company','placed_package',],
            _count: {
                placed_company: true,
            },
          });
          console.log("company", comp)
  
      let ra = [];
      for (let i = 0; i < comp.length-1; i++) {
        let refined_object = {
          placed_company: comp[i].placed_company,
          placed_package: comp[i].placed_package,
          placed_by_dept:  {
            IT : 0,
            CE : 0,
            ET : 0,
            IN : 0,
            EE : 0
          },
          count: comp[i]._count.placed_company,
        };
        ra.push(refined_object);
      }
      console.log("step1: ", ra);

      let ps = await prisma.student_placement_details.findMany({
        select: {
          roll_no: true,
          placed_company: true,
          placed_package: true,  
        },
        where: {
          placed_package: { gte: 1 },
        },
      });
      console.log("step2: ",ps)
      for (let i = 0; i < ps.length; i++){
        for(let j = 0; j< ra.length; j++){
            if(ra[j].placed_company==ps[i].placed_company||ra[j].placed_package==ps[i].placed_package){
                ra[j].placed_by_dept[ps[i].roll_no.substring(2, 4)]++;
            }
        }
      }

      return ra;
    } catch (error) {
      return error;
    }
  };

export default { getCompany };