import { Assignment } from "../interfaces/interfaces";

export function assignmentToEventData(assignment: Assignment) {
  return {
    start: {
      dateTime: assignment.due_at,
    },
    end: {
      dateTime: assignment.due_at,
    },
    description: assignment.html_url,
    summary: assignment.name,
  };
}

export async function wait(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
