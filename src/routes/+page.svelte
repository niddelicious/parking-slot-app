<script>
	import { writable } from 'svelte/store';
	import Datepicker from './DatePicker.svelte';
	import ParkingSpot from './ParkingSpot.svelte';

	let selectedDate = writable(new Date());
	let datePicked;
</script>

<div class="grid grid-cols-1 gap-4 h-full">
	<!-- Universal date picker -->
	<div class="flex justify-center items-center bg-purple-500 rounded p-4">
		<Datepicker bind:datePicked bind:selectedDate={$selectedDate} />
	</div>

	<!-- Parking spots -->
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
		<div class="bg-blue-500 rounded p-4 h-full">
			<ParkingSpot {datePicked} />
		</div>

		<div class="bg-red-500 rounded p-4 h-full">
			<ParkingSpot {datePicked} />
		</div>
		<div class="bg-green-500 rounded p-4 h-full">
			<ParkingSpot {datePicked} />
		</div>
		<div class="bg-yellow-500 rounded p-4 h-full">
			<ParkingSpot {datePicked} />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: rgba(35, 35, 35, 1);
	}
</style>
