import { News, Event, Team, Benefit, Country, MemberData, MemberSignUpFormValues } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const countries = 'https://countriesnow.space/api/v0.1/countries';

export const addMember = async (data: MemberData) => {
  try {
    const res = await fetch(`${API_URL}/api/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    return await res.json();
  } catch (error) {
    console.error('Error adding member:', error);
  }
};

export const fetchMembersList = async () => {
  try {
    const res = await fetch(`${API_URL}/api/members?filters[isApproved][$eq]=true&populate=*`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchCountriesList = async () => {
  try {
    const res = await fetch(countries);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export async function fetchNews(): Promise<News[]> {
  try {
    const res = await fetch(`${API_URL}/api/news?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getOneNews(id: string): Promise<News | null> {
  try {
    const res = await fetch(`${API_URL}/api/news/${id}?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching new:', error);
    return null;
  }
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const res = await fetch(`${API_URL}/api/events?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getOneEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching new:', error);
    return null;
  }
}

export async function fetchTeam(): Promise<Team[]> {
  try {
    const res = await fetch(`${API_URL}/api/teams?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    return [];
  }
}

export async function fetchBenefits(): Promise<Benefit[]> {
  try {
    const res = await fetch(`${API_URL}/api/benefits?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching benefits:', error);
    return [];
  }
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await fetch(`${API_URL}/api/countries?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching benefits:', error);
    return [];
  }
}
