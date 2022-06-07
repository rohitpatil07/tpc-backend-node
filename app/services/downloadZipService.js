import pdf from "pdf-creator-node";
import fs from "fs";
import AdmZip from 'adm-zip';
var html = fs.readFileSync(process.cwd() + '/app/util/table.html', "utf8");
import filterService from '../services/filterservice.js';


const zipDownload = async (students) => {
    try {
        const bitmap = fs.readFileSync(process.cwd()+'/app/util/rait2.jpg');
        const logo = bitmap.toString('base64');
        for(let i = 0; i<students.length;i++){
            let student = await filterService.getStudentProfile(students[i]);
            let x=[student]
            var options = {
                format: "A4",
                orientation: "portrait",
                border: "0mm",
            }
            var document = {
                html: html,
                data: {
                  users:x,
                  logo: logo,
                },
                path: `./Zip/output${i}.pdf`,
                type: "",
            };
            await pdf
              .create(document, options)
              .then((res) => {
            })
              .catch((error) => {
                console.error(error);
            });      
        }
        const zip = new AdmZip();
        setTimeout(()=>{
                var uploadDir = fs.readdirSync('./Zip');
				for(var v = 0; v < uploadDir.length;v++){
					zip.addLocalFile(`./Zip/`+uploadDir[v]);
				}
                const data = zip.toBuffer();
			    zip.writeZip("./export.zip");
        },300);
        setTimeout(()=>{
            if (fs.existsSync(`./export.zip`)){	     
                fs.unlinkSync(`./export.zip`, function (err) {
                    if (err)
                        throw err;
                });
            }
            var CleanDir = fs.readdirSync('./Zip');
            for(var v = 0; v < CleanDir.length;v++){
                fs.unlinkSync(`./Zip/output${v}.pdf`);
            }
        },2500);

    } catch (error) {
        return error;
    }
};

const resumeDownload = async (rollno) => {
    try {
        const bitmap = fs.readFileSync(process.cwd()+'/app/util/rait2.jpg');
        const logo = bitmap.toString('base64');
            let student = await filterService.getStudentProfile(rollno);
            let x=[student]
            var options = {
                format: "A4",
                orientation: "portrait",
                border: "0mm",
            }
            var document = {
                html: html,
                data: {
                  users:x,
                  logo: logo,
                },
                path: `./resume.pdf`,
                type: "",
            };
            await pdf
              .create(document, options)
              .then((res) => {
            })
              .catch((error) => {
                console.error(error);
            });      
        setTimeout(()=>{
            if (fs.existsSync(`./resume.pdf`)){	     
                fs.unlinkSync(`./resume.pdf`, function (err) {
                    if (err)
                        throw err;
                });
            }
        },2000);
    } catch (error) {
        return error;
    }
};

export default { zipDownload, resumeDownload };