//Required package
//var pdf = require("pdf-creator-node");
import pdf from "pdf-creator-node";
import fs from "fs";
import AdmZip from 'adm-zip';
// Read HTML Template
var html = fs.readFileSync(process.cwd() + '/app/util/table.html', "utf8");

import filterService from '../services/filterservice.js';

const download = async (students) => {
    try {
        console.log("Hi",students)
        for(let i = 0; i<students.length;i++){
            let student = await filterService.getStudentProfile(students[i]);
            let x=[student]
            
            console.log("list", x);

            var options = {
                format: "A4",
                orientation: "portrait",
                border: "0mm",
            }
            var document = {
                html: html,
                data: {
                  users:x,
                },
                path: `./Zip/output${i}.pdf`,
                type: "",
            };
            pdf
              .create(document, options)
              .then((res) => {
                console.log(res);
            })
              .catch((error) => {
                console.error(error);
            });      
        }
        const zip = new AdmZip();
        setTimeout(()=>{
                var uploadDir = fs.readdirSync('./Zip');
			    console.log("nice ",uploadDir.length) 
				for(var v = 0; v < uploadDir.length;v++){
                    console.log("folder",uploadDir[v]);
					zip.addLocalFile(`./Zip/`+uploadDir[v]);
				}
                const data = zip.toBuffer();
			    zip.writeZip("./export.zip");
        },5000);
        // setTimeout(()=>{
        //     if (fs.existsSync(`./export.zip`)){	     
        //         fs.unlinkSync(`./export.zip`, function (err) {
        //             if (err)
        //                 throw err;
        //             console.log("deleted zip file")
        //         });
        //     }
        //     var CleanDir = fs.readdirSync('./Zip');
        //     for(var v = 0; v < CleanDir.length;v++){
        //         fs.unlinkSync(`./Zip/output${v}.pdf`);
        //     }
        // },10000);

    } catch (error) {
        return error;
    }
};
    
export default { download };
    