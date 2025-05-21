<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Button from '$lib/components/common/button.svelte';
	const env = import.meta.env.MODE;

	onMount(() => {
		if (env === 'development') {
			console.log('Page mounted');
			console.log('env', env);
		}
	});
	$: if (env === 'development') {
		console.log('Page data:', page.data);
		console.log('Page state:', page.state);
	}
</script>

<div>
	<h2>Let's find some campsites to visit</h2>
	<Button href="/create">Set API</Button>
</div>
