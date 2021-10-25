import {
  createCalendarEvent,
  getCalendarEvents,
  getHomeworkCalendarId,
  updateCalendarEvent,
} from "../services/google";
import { Assignment, CalendarEvent, PairedAssignment } from "../interfaces/interfaces";
import { getAssignments } from "../services/canvas";
import { assignmentToEventData } from "../helpers/util";
import { FC } from "react";

export interface ExportProps {
  disabled: boolean;
}

const Export: FC<ExportProps> = ({ disabled }) => {
  function mapAssignmentToEvent(assignments: Assignment[], events: CalendarEvent[]) {
    return assignments
      .map((assignment) => {
        const event = events.find(
          (event) => assignment.name === event.summary && assignment.html_url === event.description
        );
        return { assignment, event };
      })
      .filter(({ assignment, event }) => {
        return event === undefined
          ? true
          : new Date(assignment.due_at) !== new Date(event.end.dateTime);
      });
  }

  async function syncCalendarEvents(pairedAssignments: PairedAssignment[], token: string) {
    const calendarId = await getHomeworkCalendarId(token);
    const promises = pairedAssignments.map(({ assignment, event }) => {
      return event === undefined
        ? createCalendarEvent(assignmentToEventData(assignment), token, calendarId)
        : updateCalendarEvent(assignmentToEventData(assignment), token, calendarId, event.id);
    });
    const results = await Promise.all(promises);
    const filtered = results.filter((result) => result === undefined);
    console.log(`Processed ${filtered.length} events`);
  }

  async function addAssignmentsToCalendar(assignments: Assignment[], token: string) {
    const calendarId = await getHomeworkCalendarId(token);
    const { items: events } = await getCalendarEvents(calendarId, token);
    console.log(`${events.length} events`);
    const mappedAssignments = mapAssignmentToEvent(assignments, events);
    syncCalendarEvents(mappedAssignments, token);
  }

  function syncHomework() {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      const assignments = await getAssignments();

      await addAssignmentsToCalendar(assignments, token);
    });
  }

  return (
    <div className="sync">
      <p>Sync your homework to your calendar!</p>
      <button className="syncBtn" disabled={disabled} onClick={syncHomework}>
        Sync to Google
      </button>
    </div>
  );
};

export default Export;
