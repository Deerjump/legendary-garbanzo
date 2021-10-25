export interface CanvasUser {
  avatar_url: string;
  created_at: string;
  effective_locale: string;
  id: number;
  name: string;
  short_name: string;
  sortable_name: string;
}

export interface Course {
  account_id: number;
  apply_assignment_group_weights: boolean;
  blueprint: boolean;
  calendar: {
    ics: string;
  };
  course_code: string;
  created_at: string;
  end_at: string;
  enrollment_term_id: number;
  friendly_name: string;
  id: number;
  name: string;
  start_at: string;
  term: {
    id: 277;
    name: "Fall 2021";
    start_at: "2021-09-11T06:00:00Z";
    end_at: "2021-12-18T07:00:00Z";
    created_at: "2020-10-24T05:28:12Z";
  };
  uuid: string;
  workflow_state: "available";
}

export interface Term {
  created_at: string;
  end_at: string;
  grading_period_group_id: null;
  id: number;
  name: string;
  start_at: string;
  workflow_state: string;
}

export interface Assignment {
  due_at: string;
  html_url: string;
  name: string;
}

export interface GoogleCalendarList {
  accessRole: string;
  backgroundColor: string;
  colorId: string;
  conferenceProperties: {
    allowedConferenceSolutionTypes: string[];
  };
  defaultReminders: unknown[];
  description: string;
  etag: string;
  foregroundColor: string;
  id: string;
  kind: string;
  summary: string;
  summaryOverride: string;
  timeZone: string;
}

export interface GoogleCalendarListResponse {
  etag: string;
  items: GoogleCalendarList[];
  kind: string;
  nextSyncToken: string;
}

export interface Calendar {
  kind: "calendar#calendar";
  etag: string;
  id: string;
  summary: string;
  description: string;
  location: string;
  timeZone: string;
  conferenceProperties: {
    allowedConferenceSolutionTypes: [string];
  };
}

export interface CalendarEvent {
  created: string;
  creator: { email: string };
  end: { dateTime: string; timeZone: string };
  etag: string;
  eventType: string;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: "calendar#event";
  organizer: {
    email: string;
    displayName: string;
    self: boolean;
  };
  description: string;
  reminders: { useDefault: boolean };
  sequence: number;
  start: { dateTime: string; timeZone: string };
  status: string;
  summary: string;
  updated: string;
}

export interface CalendarEventList {
  accessRole: string;
  defaultReminders: any[];
  etag: string;
  items: CalendarEvent[];
  kind: string;
  nextSyncToken: string;
  summary: string;
  timeZone: string;
  updated: string;
}

export interface PairedAssignment {
  assignment: Assignment;
  event?: CalendarEvent;
}

export interface EventData {
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  description: string;
  summary: string;
}
