<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Datepicker from './DatePicker.svelte';
	import ParkingSpot from './ParkingSpot.svelte';

	let selectedDate = writable(new Date());
	let datePicked;

	let parkingSpaces = [];
	onMount(async () => {
		const res = await fetch('/parkingSpaces');
		parkingSpaces = await res.json();
	});
</script>

<div class="grid grid-cols-1 gap-4 h-full">
	<!-- Universal date picker -->
	<div class="flex justify-center items-center bg-purple-500 rounded p-4">
		<Datepicker bind:datePicked bind:selectedDate={$selectedDate} />
	</div>

	<!-- Parking spots -->
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
		{#each parkingSpaces as parkingSpace}
			<ParkingSpot {datePicked} {parkingSpace} />
		{/each}
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: rgba(35, 35, 35, 1);
	}
</style>
