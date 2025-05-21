import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const baseUrl = 'https://camping.bcparks.ca';

		// Browser-like headers to bypass bot protection
		const headers = {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
			Accept:
				'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
			'Accept-Language': 'en-US,en;q=0.5',
			Connection: 'keep-alive',
			'Upgrade-Insecure-Requests': '1',
			'Sec-Fetch-Dest': 'document',
			'Sec-Fetch-Mode': 'navigate',
			'Sec-Fetch-Site': 'none',
			'Sec-Fetch-User': '?1',
			'Cache-Control': 'max-age=0'
		};

		// First request to get cookies and XSRF token
		const initialRes = await fetch(baseUrl, {
			method: 'GET',
			headers
		});

		const cookieHeader = initialRes.headers.get('set-cookie');
		const cookies = cookieHeader ? cookieHeader.split(', ') : [];

		if (initialRes.ok) {
			// Second request with the cookies to the actual API
			const apiRes = await fetch(
				`${baseUrl}/api/availability/map?mapId=-2147483551&equipmentCategoryId=-32768&startDate=2025-05-16&endDate=2025-05-19`,
				{
					headers: {
						...headers,
						Cookie: cookies.join('; '),
						Referer: baseUrl,
						'X-Requested-With': 'XMLHttpRequest'
					}
				}
			);

			if (!apiRes.ok) {
				return json(
					{ error: `API request failed with status ${apiRes.status}` },
					{ status: apiRes.status }
				);
			}

			const data = await apiRes.json();
			return json(data);
		} else {
			// For debugging - return what the initial request gave us
			const errorHtml = await initialRes.text();
			console.log('Initial request failed with status:', initialRes.status);
			return json(
				{
					error: `Initial request failed with status ${initialRes.status}`,
					errorDetails: errorHtml.substring(0, 500) // First 500 chars of error page
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Error fetching campsite data:', error);
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
};
