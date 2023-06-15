<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import Fa from 'svelte-fa';
	import { faCar, faCarAlt, faParking } from '@fortawesome/free-solid-svg-icons';
	import dayjs from 'dayjs';
	import { getContext } from 'svelte';
	import { get } from 'svelte/store';
	import ParkingForm from './ParkingForm.svelte';
	import { parkingStore } from './parkingStore'; // Import the store here
	import type { ParkingAvailability, ParkingSpace, ParkingClaim } from './parkingTypes';

	const { open } = getContext('simple-modal');

	export let parkingSpace: ParkingSpace;

	let parkingSpaceAvailability: ParkingAvailability[] = [];
	let parkingSpaceClaims: ParkingClaim[] = [];
	let isAvailable = false;
	let isWeekend = false;
	let parking_space_availability_id: number | null = null;
	let claimant_name: string | null = null;

	// You can retrieve the selected date from the store here
	onMount(async () => {
		checkAvailability();
	});

	function checkAvailability() {
		clearCache();
		const store = get(parkingStore);
		let selectedDate = dayjs(store.selectedDate).format('YYYY-MM-DD');
		parkingSpaceAvailability = store.availability.filter(
			(availability) =>
				availability.parking_space_id === parkingSpace.id && availability.date === selectedDate
		);
		if (parkingSpaceAvailability.length > 0) {
			if (parkingSpaceAvailability[0].claimed > 0) {
				console.log(parkingSpaceAvailability[0]);
				parkingSpaceClaims = store.parkingClaims.filter(
					(claim) => claim.id === parkingSpaceAvailability[0].claimed
				);
				console.log(parkingSpaceClaims);
				isAvailable = false;
				claimant_name = parkingSpaceClaims[0].claimant_name;
				parking_space_availability_id = parkingSpaceAvailability[0].id;
			} else {
				isAvailable = true;
				parking_space_availability_id = parkingSpaceAvailability[0].id;
			}
		}
	}

	function clearCache() {
		claimant_name = null;
		isAvailable = false;
		parking_space_availability_id = null;
	}

	afterUpdate(() => {
		checkAvailability();
	});

	function showBookingForm() {
		open(ParkingForm, {
			parking_space_availability_id: parking_space_availability_id,
			parkingSpace: parkingSpace,
			hasForm: true
		});
	}
</script>

<div
	class="bg-{parkingSpace.color}-500 rounded p-4 h-full flex flex-col justify-center items-center"
>
	<div
		class="text-center font-bold bg-zinc-900 text-white py-2 px-16 rounded text-2xl flex justify-center items-center"
	>
		{#if claimant_name}
			{claimant_name}
		{:else}
			{parkingSpace.name}
		{/if}
	</div>
	<div class="parking-spot-icon text-zinc-900 flex justify-center items-center">
		{#if isAvailable}
			<button on:click={showBookingForm}><Fa icon={faParking} size="10x" /></button>
		{:else if isWeekend}
			<Fa icon={faParking} size="10x" />
		{:else if claimant_name}
			<Fa icon={faCarAlt} size="10x" />
		{:else}
			<Fa icon={faCar} size="10x" />
		{/if}
	</div>
</div>
