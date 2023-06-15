<script lang="ts">
	import Modal from 'svelte-simple-modal';
	import Datepicker from './DatePicker.svelte';
	import ParkingSpot from './ParkingSpot.svelte';
	import { parkingStore } from './parkingStore';
	import { onMount } from 'svelte';

	import fetchInitialData from './parkingStore';

	$: parkingSpaces = $parkingStore.parkingSpaces;

	onMount(async () => {
		fetchInitialData();
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
			<Datepicker />
		</div>

		<!-- Parking spots -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
			{#each parkingSpaces as parkingSpace}
				<ParkingSpot {parkingSpace} />
			{/each}
		</div>
	</div>
</Modal>

<style lang="postcss">
	:global(html) {
		background-color: rgba(35, 35, 35, 1);
	}
</style>
