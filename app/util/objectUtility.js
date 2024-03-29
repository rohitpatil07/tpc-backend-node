const objectify = async (data) => {   
  let selection_object = {
    last_login:true,
    roll_no: false,
    first_name: false,
    last_name: false,
    middle_name: false,
    email: false,
    phone_number: false,
    gender: false,
    github: false,
    linkedin: false,
    no_of_offers: false,
    password: false,
    photo: false,
    department: false,
    batch: false,
    rait_email: false,
    student_skillset: false,
    student_placement_details: false,
    student_experience: false,
    other_info: false,
    academic_info: false,
  };

  for (let key in data.fields) {
    if (key in selection_object) {
      if (data.fields) {
        selection_object[key] = true;
      }
    }
  }

  let final_select_object = await other_tables(data.fields);
  selection_object.academic_info = final_select_object.academic_info;
  selection_object.other_info = final_select_object.other_info;
  selection_object.student_skillset = final_select_object.student_skillset;
  selection_object.student_placement_details =
    final_select_object.student_placement_details;
  selection_object.student_experience = final_select_object.student_experience;

  return selection_object;
};

const other_tables = async (select_object) => {
  let stud_skillset = {
    select: { certificate: false, career_obj: false, acad_achievement: false },
  };

  let stud_placement_details = {
    select: { package: false, placed_org: false, offer_letter: false },
  };

  let stud_experience = {
    select: {
      technologies: false,
      pref_lang: false,
      project: false,
      internship: false,
    },
  };

  let oth_info = {
    select: { hobbies: false, pos_of_res: false, extracuricular: false },
  };

  let acad_info = {
    select: {
      tenth_percent: false,
      twelveth_percent: false,
      sem_pointer: false,
      cgpa: false,
      be_percent: false,
      diploma_percent:false,
    },
  };

  let final_select_object = {
    student_skillset: false,
    student_placement_details: false,
    student_experience: false,
    other_info: false,
    academic_info: false,
  };

  for (let key in select_object) {
    if (
      key == 'acad_achievement' ||
      key == 'career_obj' ||
      key == 'certificate'
    ) {
      final_select_object.student_skillset = true;
      if (key == 'acad_achievement') {
        stud_skillset.select['acad_achievement_one'] = true;
        stud_skillset.select['acad_achievement_two'] = true;
        stud_skillset.select['acad_achievement_three'] = true;
        stud_skillset.select['acad_achievement_four'] = true;
      }
      if (key == 'certificate') {
        stud_skillset.select['certificate_one'] = true;
        stud_skillset.select['certificate_two'] = true;
        stud_skillset.select['certificate_three'] = true;
        stud_skillset.select['certificate_four'] = true;
        stud_skillset.select['certificate_one_completion_date'] = true;
        stud_skillset.select['certificate_two_completion_date'] = true;
        stud_skillset.select['certificate_three_completion_date'] = true;
        stud_skillset.select['certificate_four_completion_date'] = true;
      }
      if (key == 'career_obj') {
        stud_skillset.select[key] = true;
      }
    }
    if (key == 'offer_letter' || key == 'placed_org' || key == 'package') {
      final_select_object.student_placement_details = true;
      if (key == 'package') {
        stud_placement_details.select['package_one'] = true;
        stud_placement_details.select['package_two'] = true;
        stud_placement_details.select['package_three'] = true;
        stud_placement_details.select['placed_package'] = true;
      }
      if (key == 'placed_org') {
        stud_placement_details.select['placed_org_one'] = true;
        stud_placement_details.select['placed_org_two'] = true;
        stud_placement_details.select['placed_org_three'] = true;
        stud_placement_details.select['placed_company'] = true;
      }
      if (key == 'offer_letter') {
        stud_placement_details.select['offer_letter_one'] = true;
        stud_placement_details.select['offer_letter_two'] = true;
        stud_placement_details.select['offer_letter_three'] = true;
      }
    }
    if (
      key == 'internship' ||
      key == 'project' ||
      key == 'pref_lang' ||
      key == 'technologies'
    ) {
      final_select_object.student_experience = true;
      if (key == 'pref_lang') {
        stud_experience.select[key] = true;
      }
      if (key == 'technologies') {
        stud_experience.select[key] = true;
      }
      if (key == 'project') {
        stud_experience.select['project_one_description'] = true;
        stud_experience.select['project_one_title'] = true;
        stud_experience.select['project_one_start_date'] = true;
        stud_experience.select['project_one_end_date'] = true;
        stud_experience.select['project_two_description'] = true;
        stud_experience.select['project_two_title'] = true;
        stud_experience.select['project_two_start_date'] = true;
        stud_experience.select['project_two_end_date'] = true;
        stud_experience.select['project_three_description'] = true;
        stud_experience.select['project_three_title'] = true;
        stud_experience.select['project_three_start_date'] = true;
        stud_experience.select['project_three_end_date'] = true;
      }
      if (key == 'internship') {
        stud_experience.select['internship_one_description'] = true;
        stud_experience.select['internship_one_title'] = true;
        stud_experience.select['internship_one_start_date'] = true;
        stud_experience.select['internship_one_end_date'] = true;
        stud_experience.select['internship_two_description'] = true;
        stud_experience.select['internship_two_title'] = true;
        stud_experience.select['internship_two_start_date'] = true;
        stud_experience.select['internship_two_end_date'] = true;
        stud_experience.select['internship_three_description'] = true;
        stud_experience.select['internship_three_title'] = true;
        stud_experience.select['internship_three_start_date'] = true;
        stud_experience.select['internship_three_end_date'] = true;
      }
    }
    if (key == 'extracuricular' || key == 'pos_of_res' || key == 'hobbies') {
      final_select_object.other_info = true;
      if (key == 'pos_of_res') {
        oth_info.select['pos_of_res_one'] = true;
        oth_info.select['pos_of_res_two'] = true;
        oth_info.select['pos_of_res_three'] = true;
        oth_info.select['pos_of_res_four'] = true;
      }
      if (key == 'extracuricular') {
        oth_info.select['extracuricular_one'] = true;
        oth_info.select['extracuricular_two'] = true;
        oth_info.select['extracuricular_three'] = true;
      }
      if (key == 'hobbies') {
        oth_info.select[key] = true;
      }
    }
    if (
      key == 'tenth_percent' ||
      key == 'twelveth_percent' ||
      key == 'sem_pointer' ||
      key == 'cgpa' ||
      key == 'be_percent' ||
      key == 'diploma_percent'
    ) {
      final_select_object.academic_info = true;
      if (key == 'be_percent') {
        acad_info.select[key] = true;
      }
      if (key == 'cgpa') {
        acad_info.select[key] = true;
      }
      if (key == 'diploma_percent') {
        acad_info.select[key] = true;
        acad_info.select['diploma_completion_date'] = true;
        acad_info.select['diploma_obtained_marks'] = true;
        acad_info.select[' diploma_total_marks'] = true;
      }
      if (key == 'twelveth_percent') {
        acad_info.select[key] = true;
        acad_info.select['twelveth_completion_date'] = true;
        acad_info.select['twelveth_obtained_marks'] = true;
        acad_info.select['twelveth_total_marks'] = true;
      }
      if (key == 'tenth_percent') {
        acad_info.select[key] = true;
        acad_info.select['tenth_completion_date'] = true;
        acad_info.select['tenth_obtained_marks'] = true;
        acad_info.select['tenth_total_marks'] = true;
      }
      if (key == 'sem_pointer') {
        acad_info.select['sem1_pointer'] = true;
        acad_info.select['sem1_completion_date'] = true;
        acad_info.select['sem1_obtained_marks'] = true;
        acad_info.select['sem1_total_marks'] = true;
        acad_info.select['sem2_pointer'] = true;
        acad_info.select['sem2_completion_date'] = true;
        acad_info.select['sem2_obtained_marks'] = true;
        acad_info.select['sem2_total_marks'] = true;
        acad_info.select['sem3_pointer'] = true;
        acad_info.select['sem3_completion_date'] = true;
        acad_info.select['sem3_obtained_marks'] = true;
        acad_info.select['sem3_total_marks'] = true;
        acad_info.select['sem4_pointer'] = true;
        acad_info.select['sem4_completion_date'] = true;
        acad_info.select['sem4_obtained_marks'] = true;
        acad_info.select['sem4_total_marks'] = true;
        acad_info.select['sem5_pointer'] = true;
        acad_info.select['sem5_completion_date'] = true;
        acad_info.select['sem5_obtained_marks'] = true;
        acad_info.select['sem5_total_marks'] = true;
        acad_info.select['sem6_pointer'] = true;
        acad_info.select['sem6_completion_date'] = true;
        acad_info.select['sem6_obtained_marks'] = true;
        acad_info.select['sem6_total_marks'] = true;
        acad_info.select['sem7_pointer'] = true;
        acad_info.select['sem7_completion_date'] = true;
        acad_info.select['sem7_obtained_marks'] = true;
        acad_info.select['sem7_total_marks'] = true;
        acad_info.select['sem8_pointer'] = true;
        acad_info.select['sem8_completion_date'] = true;
        acad_info.select['sem8_obtained_marks'] = true;
        acad_info.select['sem8_total_marks'] = true;
        acad_info.select['masters_sem1_pointer'] = true;
        acad_info.select['masters_sem1_completion_date'] = true;
        acad_info.select['masters_sem1_obtained_marks'] = true;
        acad_info.select['masters_sem1_total_marks'] = true;
        acad_info.select['masters_sem2_pointer'] = true;
        acad_info.select['masters_sem2_completion_date'] = true;
        acad_info.select['masters_sem2_obtained_marks'] = true;
        acad_info.select['masters_sem2_total_marks'] = true;
        acad_info.select['masters_sem3_pointer'] = true;
        acad_info.select['masters_sem3_completion_date'] = true;
        acad_info.select['masters_sem3_obtained_marks'] = true;
        acad_info.select['masters_sem3_total_marks'] = true;
        acad_info.select['masters_sem4_pointer'] = true;
        acad_info.select['masters_sem4_completion_date'] = true;
        acad_info.select['masters_sem4_obtained_marks'] = true;
        acad_info.select['masters_sem4_total_marks'] = true;
      }
    }
  }

  delete stud_skillset.select['certificate'];
  delete stud_skillset.select['acad_achievement'];
  delete stud_placement_details.select['offer_letter'];
  delete stud_placement_details.select['placed_org'];
  delete stud_placement_details.select['package'];
  delete stud_experience.select['internship'];
  delete stud_experience.select['project'];
  delete oth_info.select['extracuricular'];
  delete oth_info.select['pos_of_res'];
  delete acad_info.select['sem_pointer'];

  for (let key in final_select_object) {
    if (final_select_object[key] == true) {
      if (key == 'student_skillset') {
        final_select_object[key] = stud_skillset;
      }
      if (key == 'student_placement_details') {
        final_select_object[key] = stud_placement_details;
      }
      if (key == 'student_experience') {
        final_select_object[key] = stud_experience;
      }
      if (key == 'other_info') {
        final_select_object[key] = oth_info;
      }
      if (key == 'academic_info') {
        final_select_object[key] = acad_info;
      }
    }
  }
  return final_select_object;
};
export default objectify;
