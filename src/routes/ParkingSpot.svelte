<script>
	import { onMount, afterUpdate } from 'svelte';
	import Fa from 'svelte-fa';
	import { faCar, faCarAlt, faParking } from '@fortawesome/free-solid-svg-icons';
	import dayjs from 'dayjs';

	export let datePicked;
	export let parkingSpace;
	export let availibility;
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

	function updateIsAvailable() {
		isAvailable = filteredAvailibility.some(
			(availability) => availability.date === datePickedFormatted
		);
	}

	$: {
		isWeekend = dayjs(datePicked).day() === 0 || dayjs(datePicked).day() === 6;
		updateIsAvailable();
	}

	afterUpdate(() => {
		updateIsAvailable();
	});
</script>

<div class="parking-spot bg-{parkingSpace.color}-500 rounded p-4 h-full">
	<div class="parking-spot-name">{parkingSpace.name}</div>
	<div class="parking-spot-icon">
		{#if isAvailable}
			<Fa icon={faParking} size="10x" />
		{:else if isWeekend}
			<Fa icon={faParking} size="10x" />
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
