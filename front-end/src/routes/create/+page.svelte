<script lang="ts">
	import { onMount } from 'svelte';

	interface CampgroundFormData {
		title: string;
		description: string;
		price: string;
		location: string;
		urlAPI: string;
	}

	let formData: CampgroundFormData = {
		title: '',
		description: '',
		price: '',
		location: '',
		urlAPI: ''
	};

	interface FormErrors {
		title?: string;
		description?: string;
		location?: string;
		price?: string;
		urlAPI?: string;
		form?: string;
	}

	let errors: FormErrors = {};
	let isSubmitting = false;
	let submitSuccess = false;

	function validateForm() {
		errors = {};
		if (!formData.title) errors.title = 'Title is required';
		if (!formData.description) errors.description = 'Description is required';
		if (!formData.location) errors.location = 'Location is required';

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;

		try {
			// Replace with actual API call
			const response = await fetch('/api/campgrounds', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitSuccess = true;
				formData = { title: '', description: '', price: '', location: '', urlAPI: '' };
			} else {
				const error = await response.json();
				errors = error.errors || { form: 'Failed to create' };
			}
		} catch (error) {
			errors.form = 'Network error occurred';
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		// Any initialization code here
	});
	// export let data;
	// export let campResults = data?.campResults || [];
	// console.log('campResults', campResults);
</script>

<svelte:head>
	<title>Create New Campground</title>
</svelte:head>
<div class="container-wrapper">
	<div class="container">
		<h3 class="mb-4 text-center text-4xl text-gray-800">Create New Campground Notification</h3>

		{#if submitSuccess}
			<div class="success-message">Campground created successfully!</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<label for="title">Title</label>
				<input type="text" id="title" bind:value={formData.title} class:error={errors.title} />
				{#if errors.title}<span class="error-message">{errors.title}</span>{/if}
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<textarea
					id="description"
					bind:value={formData.description}
					rows="5"
					class:error={errors.description}
				></textarea>
				{#if errors.description}<span class="error-message">{errors.description}</span>{/if}
			</div>

			<div class="form-group">
				<label for="location">Location</label>
				<input
					type="text"
					id="location"
					bind:value={formData.location}
					class:error={errors.location}
				/>
				{#if errors.location}<span class="error-message">{errors.location}</span>{/if}
			</div>

			<div class="form-group">
				<label for="urlAPI">API URL</label>
				<input type="text" id="urlAPI" bind:value={formData.urlAPI} />
			</div>

			{#if errors.form}<div class="error-message form-error">{errors.form}</div>{/if}

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Creating...' : 'Create Campground'}
			</button>
		</form>
	</div>
</div>

<style>
	.container-wrapper {
		background: radial-gradient(circle at center, white 30%, rgba(253, 250, 250, 0) 100%);
	}
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		border-radius: 20px;
	}

	h1 {
		margin-bottom: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
	}

	input.error,
	textarea.error {
		border-color: #e53e3e;
	}

	.error-message {
		color: #e53e3e;
		font-size: 0.875rem;
		margin-top: 0.25rem;
		display: block;
	}

	.form-error {
		margin-bottom: 1rem;
	}

	button {
		background-color: #3182ce;
		color: white;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #2c5282;
	}

	button:disabled {
		background-color: #a0aec0;
		cursor: not-allowed;
	}

	.success-message {
		background-color: #48bb78;
		color: white;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1.5rem;
	}
</style>
