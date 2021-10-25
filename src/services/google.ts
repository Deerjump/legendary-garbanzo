import {
  Calendar,
  CalendarEvent,
  CalendarEventList,
  EventData,
  GoogleCalendarListResponse,
} from "../interfaces/interfaces";
import { exponentialRetry, sendRequest } from "../helpers/requests";
import { AxiosRequestConfig } from "axios";
import { CALENDAR_NAME } from "../constants/constants";

const BASE_URL = "https://www.googleapis.com/calendar/v3";
const CALENDAR_LIST_URL = `${BASE_URL}/users/me/calendarList`;
const CALENDARS_URL = `${BASE_URL}/calendars`;
const MAX_EVENT_RESULTS = "2500";

export const getCalendarEvents = async (calendarId: string, token: string) => {
  const url = `${CALENDARS_URL}/${calendarId}/events?maxResults=${MAX_EVENT_RESULTS}`;
  const config: AxiosRequestConfig = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await sendRequest<CalendarEventList>(config);
  return response;
};

export const getCalendarList = async (token: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: CALENDAR_LIST_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { items } = await sendRequest<GoogleCalendarListResponse>(config);
  return items;
};

export async function getHomeworkCalendarId(token: string) {
  const calendarList = await getCalendarList(token);
  const calendar = calendarList.find((calendar) => calendar.summary === CALENDAR_NAME);
  if (calendar != null) return calendar.id;
  const homeworkCalendar = await createHomeworkCalendar(token);
  return homeworkCalendar.id;
}

export const createHomeworkCalendar = async (token: string) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: CALENDARS_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      summary: CALENDAR_NAME,
    },
  };

  return await sendRequest<Calendar>(config);
};

export const createCalendarEvent = async (data: EventData, token: string, calendarId: string) => {
  const url = `${CALENDARS_URL}/${calendarId}/events`;
  const config: AxiosRequestConfig = {
    method: "POST",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return await exponentialRetry<CalendarEvent>(config);
};

export const updateCalendarEvent = async (
  data: EventData,
  token: string,
  calendarId: string,
  eventId: string
) => {
  if (eventId === "") throw new Error(`eventId cannot be empty or null!`);

  const url = `${CALENDARS_URL}/${calendarId}/events/${eventId}`;
  const config: AxiosRequestConfig = {
    method: "PUT",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return await exponentialRetry<CalendarEvent>(config);
};
