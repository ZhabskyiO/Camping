import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	try {
		const res = await fetch('/api/campsites');

		if (!res.ok) {
			throw new Error('Failed to fetch campsite data');
		}

		const campResults = await res.json();
		return { campResults };
	} catch (error) {
		console.error('Error in load function:', error);
		return { campResults: null, error: 'Failed to load data' };
	}
};
