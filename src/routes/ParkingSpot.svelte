<script>
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faCar, faCarAlt, faParking } from '@fortawesome/free-solid-svg-icons';
	import dayjs from 'dayjs';
	import { getContext } from 'svelte';
	import ParkingForm from './ParkingForm.svelte';
	const { open } = getContext('simple-modal');
	const dispatch = createEventDispatcher();
	const showBookingForm = () =>
		open(ParkingForm, {
			parking_space_availability_id: parking_space_availability_id,
			parkingSpace: parkingSpace,
			hasForm: true
		});

	export let datePicked;
	export let parkingSpace;
	export let availibility;

	function parkingUpdated() {
		dispatch('parkingUpdated');
	}

	let datePickedFormatted = dayjs(datePicked).format('YYYY-MM-DD');
	$: {
		datePickedFormatted = dayjs(datePicked).format('YYYY-MM-DD');
	}

	let filteredAvailibility = [];

	$: {
		filteredAvailibility = availibility.filter(
			(availability) => availability.parking_space_id === parkingSpace.id
		);
	}

	let isAvailable = false;
	let isWeekend = false;
	let parking_space_availability_id = null;
	let claimant_name = null;

	async function updateIsAvailable() {
		let foundAvailability = filteredAvailibility.find(
			(availability) => availability.date === datePickedFormatted
		);
		if (foundAvailability) {
			if (foundAvailability.claimed > 0) {
				let claimed = await fetch('/claims/' + foundAvailability.claimed);
				let claim = await claimed.json();
				claimant_name = claim[0].claimant_name;
				isAvailable = false;
				parking_space_availability_id = null;
			} else {
				claimant_name = null;
				isAvailable = true;
				parking_space_availability_id = foundAvailability.id;
			}
		} else {
			claimant_name = null;
			isAvailable = false;
			parking_space_availability_id = null;
		}
	}

	$: {
		isWeekend = dayjs(datePicked).day() === 0 || dayjs(datePicked).day() === 6;
	}

	afterUpdate(() => {
		updateIsAvailable();
	});
</script>

<div class="parking-spot bg-{parkingSpace.color}-500 rounded p-4 h-full">
	<div class="parking-spot-name">
		{#if claimant_name}
			{claimant_name}
		{:else}
			{parkingSpace.name}
		{/if}
	</div>
	<div class="parking-spot-icon">
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

<style>
	.parking-spot-name {
		display: flex;
		font-size: 1.5rem;
		font-weight: bold;
		justify-content: center;
		align-items: center;
		background-color: black;
		color: white;
		padding: 0.5rem 2em;
		border-radius: 0.25rem;
		text-align: center;
		font-size: 1.5rem;
		font-weight: bold;
	}
	.parking-spot-icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.parking-spot {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
