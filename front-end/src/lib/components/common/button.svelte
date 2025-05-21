<script lang="ts">
	import { goto } from '$app/navigation';

	// Button properties with proper TypeScript typing
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let loading = false;
	export let fullWidth = false;
	export let className = ''; // custom class names

	export let href: string | null = null;

	// Compute classes based on props
	$: buttonClasses = [
		'btn',
		`btn-${variant}`,
		`btn-${size}`,
		fullWidth && 'btn-full',
		disabled && 'btn-disabled',
		loading && 'btn-loading',
		className
	]
		.filter(Boolean)
		.join(' ');

	function handleClick() {
		if (href) {
			goto(href);
		}
	}
</script>

<button
	{type}
	class={buttonClasses}
	{disabled}
	on:click={href ? handleClick : undefined}
	{...$$restProps}
>
	{#if loading}
		<span class="spinner" aria-hidden="true"></span>
	{/if}
	<slot />
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	/* Sizes */
	.btn-sm {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
	}
	.btn-md {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
	.btn-lg {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
	}

	/* Variants - Amber Palette */
	.btn-primary {
		background-color: #f59e0b; /* amber-500 */
		color: white;
		border: 1px solid #f59e0b; /* amber-500 */
	}
	.btn-primary:hover:not(.btn-disabled) {
		background-color: #d97706; /* amber-600 */
		border-color: #d97706; /* amber-600 */
	}

	.btn-secondary {
		background-color: #78350f; /* amber-900 */
		color: white;
		border: 1px solid #78350f; /* amber-900 */
	}
	.btn-secondary:hover:not(.btn-disabled) {
		background-color: #92400e; /* amber-800 */
		border-color: #92400e; /* amber-800 */
	}

	.btn-outline {
		background-color: transparent;
		color: #f59e0b; /* amber-500 */
		border: 1px solid #f59e0b; /* amber-500 */
	}
	.btn-outline:hover:not(.btn-disabled) {
		background-color: #fffbeb; /* amber-50 */
	}

	.btn-ghost {
		background-color: transparent;
		color: #f59e0b; /* amber-500 */
		border: 1px solid transparent;
	}
	.btn-ghost:hover:not(.btn-disabled) {
		background-color: #fffbeb; /* amber-50 */
	}

	.btn-disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}

	.btn-full {
		width: 100%;
	}

	.btn-loading {
		position: relative;
	}

	.spinner {
		display: inline-block;
		width: 1em;
		height: 1em;
		margin-right: 0.5rem;
		border: 0.15em solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.75s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
