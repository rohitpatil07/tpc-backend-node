const makect = (gender,department) =>{
    const object={gender:gender,
                department:department,
    };
    return object;
}

const ultimo_select = (select) => {
    const object={
        rollno:select.rollno,
        first_name:select.first_name,
        last_name:select.last_name,
        middle_name:select.middle_name,
        email:select.email,
        phone_number:select.phone_number,
        gender:select.gender,
        no_of_offers:select.no_of_offers,
        department:select.department,
        batch:select.batch,
    };
    return object;
};

const ultimo_where = () => {
    const object={
        other_info: {
            
        },
        academic_info: {

        },
        student_placement_details: {

        },
        student_experience: {

        },
        student_skillset: {

        },
    };
    return object;
};

export default{
    makect,ultimo_select,ultimo_where,
};