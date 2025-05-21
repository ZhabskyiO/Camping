<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/common/button.svelte';
	import '../app.css';
	import BackIcon from '$lib/components/Icons/BackIcon.svelte';

	let { children } = $props();
</script>

<div class="landing-page relative">
	{#if page.url.pathname !== '/'}
		<Button className="absolute top-4 left-4" href="/"
			><span> <BackIcon className="h-6 w-6" /></span>
			<span class="ml-2">Back</span>
		</Button>
	{/if}
	{@render children()}
</div>

<style>
	.landing-page {
		background-image: url('../lib/assets/background.png');
		background-size: cover;
		background-position: center;
		height: 100vh;
		width: 100%;
	}
</style>
