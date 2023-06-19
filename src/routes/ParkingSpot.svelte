<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import Fa from 'svelte-fa';
	import { faCar, faCarAlt, faParking, faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import dayjs from 'dayjs';
	import { getContext } from 'svelte';
	import { get } from 'svelte/store';
	import ParkingForm from './ParkingForm.svelte';
	import ClaimForm from './ClaimForm.svelte';
	import { parkingStore } from './parkingStore'; // Import the store here
	import type { ParkingAvailability, ParkingSpace, ParkingClaim } from './parkingTypes';

	const { open } = getContext('simple-modal');

	export let parkingSpace: ParkingSpace;

	let parkingSpaceAvailability: ParkingAvailability[] = [];
	let parkingSpaceClaims: ParkingClaim[] = [];
	let isAvailable = false;
	let isWeekend = false;
	let parking_space_availability_id: number | null = null;
	let claim: ParkingClaim | null = null;
	let availabilityList: ParkingAvailability[] = [];

	onMount(async () => {
		checkAvailability();
	});

	function checkAvailability() {
		clearCache();
		const store = get(parkingStore);
		let selectedDate = dayjs(store.selectedDate).format('YYYY-MM-DD');
		availabilityList = store.availability.filter(
			(availability) => availability.parking_space_id === parkingSpace.id
		);
		parkingSpaceAvailability = store.availability.filter(
			(availability) =>
				availability.parking_space_id === parkingSpace.id && availability.date === selectedDate
		);
		if (parkingSpaceAvailability.length > 0) {
			if (parkingSpaceAvailability[0].claimed > 0) {
				parkingSpaceClaims = store.parkingClaims.filter(
					(claim) => claim.id === parkingSpaceAvailability[0].claimed
				);
				isAvailable = false;
				claim = parkingSpaceClaims[0];
				parking_space_availability_id = parkingSpaceAvailability[0].id;
			} else {
				isAvailable = true;
				parking_space_availability_id = parkingSpaceAvailability[0].id;
			}
		}
	}

	function clearCache() {
		claim = null;
		isAvailable = false;
		parking_space_availability_id = null;
	}

	afterUpdate(() => {
		checkAvailability();
	});

	function gotoDate(selectedAvailability: ParkingAvailability) {
		parkingStore.update((store) => {
			store.selectedDate = selectedAvailability.date;
			return store;
		});
	}

	function isSelectedDate(availability: ParkingAvailability) {
		const store = get(parkingStore);
		let selectedDate = dayjs(store.selectedDate).format('YYYY-MM-DD');
		if (availability.date === selectedDate) {
			return true;
		} else {
			return false;
		}
	}

	function showBookingForm() {
		open(ParkingForm, {
			parking_space_availability_id: parking_space_availability_id,
			parkingSpace: parkingSpace,
			hasForm: true
		});
	}

	function showClaimForm() {
		open(ClaimForm, {
			claim: claim,
			hasForm: true
		});
	}
</script>

<div class="bg-{parkingSpace.color}-500 rounded p-4 h-full flex justify-center items-stretch gap-1">
	<div class="flex flex-col">
		<div
			class="text-center font-bold bg-zinc-900 text-white py-2 px-16 rounded text-2xl flex justify-center items-center"
		>
			{#if claim}
				{claim.claimant_name}
			{:else}
				{parkingSpace.name}
			{/if}
		</div>
		<div class="parking-spot-icon text-zinc-900 flex justify-center items-center">
			{#if isAvailable}
				<button on:click={showBookingForm}><Fa icon={faParking} size="10x" /></button>
			{:else if isWeekend}
				<Fa icon={faParking} size="10x" />
			{:else if claim}
				<button on:click={showClaimForm}><Fa icon={faCarAlt} size="10x" /></button>
			{:else}
				<Fa icon={faCar} size="10x" />
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-1">
		{#each availabilityList as availability}
			<button
				on:click={gotoDate(availability)}
				class="bg-zinc-900 rounded px-4 py-2 text-center text-white text-md font-bold"
			>
				{#if isSelectedDate(availability)}
					<Fa icon={faArrowRight} size="md" class="inline-block text-green-500" />
				{/if}
				{dayjs(availability.date).format('DD/MM')}
				{#if availability.claimed > 0}
					<Fa icon={faCarAlt} size="md" class="inline-block" />
				{/if}
			</button>
		{/each}
	</div>
</div>
