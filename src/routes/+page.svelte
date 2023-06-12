<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Modal from 'svelte-simple-modal';
	import Datepicker from './DatePicker.svelte';
	import ParkingSpot from './ParkingSpot.svelte';

	let selectedDate = writable(new Date());
	let datePicked;

	let parkingSpaces = [];
	let availibility = [];
	onMount(async () => {
		const db_parkingSpaces = await fetch('/parkingSpaces');
		parkingSpaces = await db_parkingSpaces.json();
		const db_availibility = await fetch('/availability/');
		availibility = await db_availibility.json();
	});
</script>

<Modal
	unstyled={true}
	classBg="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center bg-neutral-800/[.9]"
	classWindowWrap="relative m-2 max-h-full"
	classWindow="relative w-40 max-w-full max-h-full my-2 mx-auto text-white rounded shadow-md"
	classContent="relative p-0 "
	closeButton={false}
>
	<div class="grid grid-cols-1 gap-4 h-full">
		<!-- Universal date picker -->
		<div class="flex justify-center items-center bg-purple-500 rounded p-4">
			<Datepicker bind:datePicked bind:selectedDate={$selectedDate} />
		</div>

		<!-- Parking spots -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
			{#each parkingSpaces as parkingSpace}
				<ParkingSpot {datePicked} {parkingSpace} {availibility} />
			{/each}
		</div>
	</div>
</Modal>

<style lang="postcss">
	:global(html) {
		background-color: rgba(35, 35, 35, 1);
	}
</style>
