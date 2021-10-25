import { getByUrl } from "../helpers/requests";
import { Assignment, CanvasUser, Course, Term } from "../interfaces/interfaces";

const BASE_URL = "https://byui.instructure.com/api/v1";
export const GET_USER_URL = `${BASE_URL}/users/self`;
const GET_ENROLLMENT_TERMS_URL = `${BASE_URL}/accounts/1/terms`;
const GET_COURSES_URL = `${BASE_URL}/users/self/courses?enrollment_state=active&include[]=term`;

export const getUser = async () => {
  try {
    return await getByUrl<CanvasUser>(GET_USER_URL);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getCourses = async () => {
  try {
    const courses = await getByUrl<Course[]>(GET_COURSES_URL);
    return courses.filter((course) => !["Devotional", "Default Term"].includes(course.term.name));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getAssignments = async () => {
  const courses = await getCourses();
  const results = await Promise.all(
    courses.map(async (course) => {
      const url = `https://byui.instructure.com/api/v1/users/self/courses/${course.id}/assignments?per_page=200`;
      try {
        return await getByUrl<Assignment[]>(url);
      } catch (err) {
        console.error(err);
        return [];
      }
    })
  );
  const reduced = results.reduce<Assignment[]>((acc, curr) => {
    return [...acc, ...curr];
  }, []);
  return reduced;
};

export const getEnrollmentTerms = async () => {
  try {
    return await getByUrl<Term[]>(GET_ENROLLMENT_TERMS_URL);
  } catch (err) {
    console.error(err);
    return [];
  }
};
