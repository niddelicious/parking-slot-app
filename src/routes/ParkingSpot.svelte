<script>
	let isAvailable = false; // you can change this based on the parking spot's status

	import Fa from 'svelte-fa';
	import { faCar, faCarAlt, faParking } from '@fortawesome/free-solid-svg-icons';
	import dayjs from 'dayjs';

	export let datePicked;

	let isWeekend;

	$: {
		isWeekend = dayjs(datePicked).day() === 0 || dayjs(datePicked).day() === 6;
	}
</script>

<div class="parking-spot">
	{#if isAvailable}
		<Fa icon={faParking} size="10x" />
	{:else if isWeekend}
		<Fa icon={faParking} size="10x" />
	{:else}
		<Fa icon={faCar} size="10x" />
	{/if}
</div>

<style>
	.parking-spot {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
