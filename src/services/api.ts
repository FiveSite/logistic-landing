import { News, Event, Team, Benefit, Country, MemberData } from '@/types';
import { axiosInstance } from '@/utils/axios';
import { nextAxios } from '@/utils/axios-next';

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

export const fetchMembersList = async ({
  page,
  countryValue,
  cityValue,
  companyValue,
  servicesValue,
  searchValue,
}: {
  page: number;
  countryValue?: string;
  cityValue?: string;
  companyValue?: string;
  servicesValue?: string;
  searchValue?: string;
}) => {
  try {
    const params: Record<string, string> = {
      'pagination[page]': page.toString(),
      'pagination[pageSize]': '10',
      populate: '*',
      'filters[isApproved][$eq]': 'true',
    };

    if (companyValue) {
      params['filters[company][$eq]'] = companyValue;
    }

    if (countryValue) {
      params['filters[country][$eq]'] = countryValue;
    }

    if (cityValue) {
      params['filters[city][$eq]'] = cityValue;
    }

    if (servicesValue) {
      params['filters[services][$contains]'] = servicesValue;
    }

    if (searchValue) {
      const fields = ['company', 'country', 'address', 'services', 'profile', 'memberId', 'branchLocations', 'city'];

      fields.forEach((field, index) => {
        params[`filters[$or][${index}][${field}][$containsi]`] = searchValue;
      });
    }

    const res = await axiosInstance.get('/api/members', { params });

    return res.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    return { data: [], meta: { pagination: {} } };
  }
};

export const fetchMember = async (id: string, token: string) => {
  try {
    const res = await axiosInstance.get(`/api/members/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching member:', error);
    return null;
  }
};

export const fetchMembersList2 = async () => {
  try {
    const res = await axiosInstance.get('/api/members');
    return res.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    return { data: [], meta: { pagination: {} } };
  }
};

export const updateCompanyMember = async (id: string, data: Record<string, string>) => {
  try {
    const res = await nextAxios.put(`/api/members/update`, { id, data });
    return res.data;
  } catch (error) {
    console.error('Error updating member:', error);
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
