<script>
	import dayjs from 'dayjs';
	import 'dayjs/locale/sv';
	import { Datepicker, themes } from 'svelte-calendar';
	const { dark: theme } = themes;

	export let selectedDate;
	const startOfWeekIndex = 1;
	const defaultFormat = 'dddd D MMMM, YYYY';
	let store;

	let locale = 'sv';
	dayjs.locale(locale);
	export let datePicked;

	$: if ($store?.hasChosen) {
		datePicked = $store.selected;
	} else {
		datePicked = selectedDate;
	}
</script>

<Datepicker
	{theme}
	bind:start={selectedDate}
	{startOfWeekIndex}
	bind:store
	let:key
	let:send
	let:receive
>
	<button in:receive|local={{ key }} out:send|local={{ key }}>
		{#if $store?.hasChosen}
			{dayjs($store.selected).format(defaultFormat)}
		{:else}
			{dayjs(selectedDate).format(defaultFormat)}
		{/if}
	</button>
</Datepicker>

<style lang="postcss">
	button {
		background: rgba(35, 35, 35, 1);
		color: #fff;
		border: 0;
		padding: 18px 30px;
		font-size: 1.2em;
		border-radius: 6px;
		cursor: pointer;
		text-transform: capitalize;
	}
</style>
