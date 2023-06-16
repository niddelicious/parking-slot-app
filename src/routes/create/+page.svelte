<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type { ParkingSpace } from '../parkingTypes';

	const dispatch = createEventDispatcher();

	let parkingSpaces: ParkingSpace[] = [];
	let selectedParkingSpace: number;
	let date = new Date().toISOString().slice(0, 10); // set date to today's date
	let result_message = '';
	onMount(async () => {
		const res = await fetch('/parkingSpaces');
		parkingSpaces = await res.json();
	});

	async function submitForm() {
		const res = await fetch('/create/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ parkingSpace: selectedParkingSpace, date: date })
		});
		let result = await res.json();
		result_message = result.body.message;
		dispatch('parkingUpdated');
	}
</script>

<h1 class="text-lg font-bold text-white my-4">Öppna parkeringsplats</h1>

<form on:submit|preventDefault={submitForm} class="my-4">
	<div class="my-2 flex flex-row flex-wrap gap-1">
		{#each parkingSpaces as parkingSpace (parkingSpace.id)}
			<label class="basis-1/3 flex-1">
				<div class="font-bold bg-{parkingSpace.color}-500 rounded p-4">
					<input
						type="radio"
						bind:group={selectedParkingSpace}
						value={parkingSpace.id}
						class="form-radio text-black border-white"
					/>
					<span>{parkingSpace.id}: {parkingSpace.name}</span>
				</div>
			</label>
		{/each}
	</div>
	<div>
		<input
			type="date"
			bind:value={date}
			required
			class="form-input px-4 py-3 block w-full bg-purple-500 rounded text-white font-bold"
		/>
	</div>
	<button
		type="button"
		on:click={submitForm}
		class="my-4 px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
		>Submit</button
	>
</form>
{#if result_message != ''}
	<div class="my-4 px-3 py-2 rounded text-white bg-indigo-500 focus:outline-none">
		{result_message}
	</div>
{/if}

<style lang="postcss">
	:global(html) {
		background-color: rgba(35, 35, 35, 1);
	}
</style>
