<script lang="ts">
	import dayjs from 'dayjs';
	import 'dayjs/locale/sv';
	import { Datepicker, themes } from 'svelte-calendar';
	import { parkingStore } from './parkingStore';
	import type { Writable } from 'svelte/store';

	const { dark: theme } = themes;

	const startOfWeekIndex = 1;
	const defaultFormat = 'dddd D MMMM, YYYY';
	let store: Writable<{ hasChosen: boolean; selected: Date }>;

	let locale = 'sv';
	dayjs.locale(locale);

	let datePicked = $parkingStore.selectedDate;

	$: if ($store?.hasChosen) {
		datePicked = $store.selected;
		parkingStore.update((store) => {
			store.selectedDate = datePicked;
			return store;
		});
	}
</script>

<Datepicker
	{theme}
	bind:start={$parkingStore.selectedDate}
	{startOfWeekIndex}
	bind:store
	let:key
	let:send
	let:receive
>
	<button
		class="bg-zinc-900 text-white text-xl font-bold py-4 px-8 rounded text-lg focus:outline-none focus:shadow-outline capitalize cursor-pointer"
		in:receive|local={{ key }}
		out:send|local={{ key }}
	>
		{dayjs($parkingStore.selectedDate).format(defaultFormat)}
	</button>
</Datepicker>
